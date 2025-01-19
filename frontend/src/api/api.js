const API_URL = "http://localhost:4000/api/"

// Gets all the information from everyone in the group
export async function getPeopleInGroup(groupID) {
  try {
    const response = await fetch(`${API_URL}group/user/${groupID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
    return data?.users
  } catch (error) {}

  // return mockData
}

export async function uploadVideo(userID, videoFile) {
  try {
    const response = await fetch(`${API_URL}asset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        userID: userID,
        asset: videoFile,
      },
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export async function getGroupId(groupID) {
  console.log(groupID)
  try {
    const response = await fetch(`${API_URL}group/${groupID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

async function getAllUsersAssetsInGroup(groupId) {
  try {
    const response = await fetch(`${API_URL}asset/group/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

// Gets the assets of a user
async function getAssetsOfUser(userId) {
  try {
    const response = await fetch(`${API_URL}asset/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

//
export async function removeUserFromGroup(groupId, userId) {
  try {
    const response = await fetch(`${API_URL}group/${groupId}/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export async function joinGroup(groupCode, uid) {
  try {
    const response = await fetch(`${API_URL}group/add/${groupCode}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: uid,
      }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createGroup(uid) {
  console.log(uid)
  try {
    const response = await fetch(`${API_URL}group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: uid,
      }),
    })
    const data = await response.json()
    //localStorage.setItem('groups', data);
    return data
  } catch (error) {
    console.log(error)
  }
}

function addUserToGroup() {}

async function getVideo(groupId, userId) {
  try {
    const response = await fetch(`${API_URL}group/:groupId/user/:userId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export async function createUser(name, email, avatar) {
  try {
    const response = await fetch(`${API_URL}user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        avatar: avatar,
      }),
    })
    const data = await response.json()
    console.log(data._id)
    localStorage.setItem("uid", data._id)
    console.log(data)
    console.log(data._id)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function HasPostThisWeek(userID) {
  try {
    const response = await fetch(`${API_URL}asset/has-uploaded/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if (data.hasUploaded) {
      return true
    }
    return false
  } catch (error) {
    console.log(error)
  }
}
