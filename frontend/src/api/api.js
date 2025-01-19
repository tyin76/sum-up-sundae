// Gets all the information from everyone in the group
export async function getPeopleInGroup() {
    const mockData = [
        {
            name: "John",
            email: '135134'
        },
        {
            name: "Johnathan",
            email: 'aiweiiawe'
        },
        {
            name: "Josh",
            email: 'wfiwiejfio'
        },
        {
            name: "Hieu",
            email: "asidoashid"
        },
        {
            name: "Terence",
            email: "ahudhasoidioasd"
        }, 
        {
            name: "Jake",
            email: "ahsdiohasodhioas"
        }

    ]

    return mockData
}

export async function getGroupId(groupID) {
    console.log(groupID);
    try {
        const response = await fetch(`http://localhost:4898/api/group/${groupID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllUsersAssetsInGroup(groupId) {
    try {
        const response = await fetch(`http://localhost:5000/api/asset/group/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }  
}

// Gets the assets of a user
async function getAssetsOfUser(userId) {
    try {
        const response = await fetch(`http://localhost:4898/api/asset/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// 
async function removeUserFromGroup(groupId, userId) {
    try {
        const response = await fetch(`http://localhost:4898/api/group/${groupId}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export async function joinGroup(groupCode) {

   const uid = localStorage.getItem('uid');

   try {
    const response = await fetch(`http://localhost:4898/api/group/${groupCode}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: uid
        })
    });
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.log(error);
}


}

export async function createGroup() {

    const uid = localStorage.getItem('uid');
    console.log(uid);
    try {
        const response = await fetch('http://localhost:4898/api/group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: uid
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }

}

function addUserToGroup() {

}

async function getVideo(groupId, userId) {
        try {
        const response = await fetch(`http://localhost:5000/api/group/:groupId/user/:userId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(name, email, avatar) {
    
    try {
        const response = await fetch('http://localhost:4898/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                avatar: avatar
            })
        });
        const data = await response.json();
        console.log(data._id);
        localStorage.setItem('uid', data._id);
        console.log(data)
        console.log(data._id);
    } catch (error) {
        console.log(error);
    }

}

function didPostToday() {
    const mockData = true;

    return mockData
}