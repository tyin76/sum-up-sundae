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

// Gets the current group code the user is currently in
function getCurrentGroupCode() {

}

// 
function leaveCurrentGroup() {

}

function joinGroup(code) {
    

}

function createGroup() {

}

function uploadVideo() {

}

function getVideo(email) {
    
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
        console.log(data)
    } catch (error) {
        console.log(error);
    }

}

function didPostToday() {
    const mockData = true;

    return mockData
}