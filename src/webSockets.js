const webSocketUrl = 'ws://localhost:3000/cable'

function webSocketConnection(houseId) {
    const socket = new WebSocket(webSocketUrl);
    socket.onopen = (e) => {
        console.log("Web socket open");
        const msg = {
            command: "subscribe",
            identifier: JSON.stringify({
                // house: `house_${houseId}`
                channel: `HouseChannel`,
                house_id: houseId
            })
        };
        socket.send(JSON.stringify(msg));
    };
    socket.onmessage = (e) => {
        const resp = JSON.parse(e.data);
        console.log(resp);
        if(!!resp.identifier && !!resp.message) {
            const choreAdapter = new ChoreAdapter(houseId);
            if(resp.message.action === "create"){
                choreAdapter.handleCreateJson(resp.message.chore);
            } else if (resp.message.action === "edit") {
                const chore = Chore.all.find((el) => resp.message.chore.data.id == el.id);
                if (!!chore.houseMemberId){
                    chore.updateAssgChore(resp.message.chore.data.attributes, true)
                } else {
                    if(resp.message.isAssg) {
                        chore.updateAssgChore(resp.message.chore.data.attributes, false)
                    } else {
                        chore.updateUnassgChore(resp.message.chore.data.attributes);
                    }
                    
                }
            } else if(resp.message.action === "delete") {
                const chore = Chore.all.find((el) => resp.message.id == el.id)
                debugger
                if (!!chore.houseMemberId){
                    chore.deleteAssgChore()
                } else{
                    chore.deleteUnassgChoreFromDom()
                }
            }
        }
    }
}