function makeFriendsList(friends) {
  let fullName = friends.map ( friend => friend.firstName + " " + friend.lastName );
  let friendsNames = fullName.join (`<li>`);


  let friensList = document.createElement ("ul");
  let newFriend = document.createElement ("li");

  friensList.append (newFriend);

  newFriend.innerHTML = friendsNames;

  return friensList;

  }
