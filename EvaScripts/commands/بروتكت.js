module.exports.config = {
  name: "بروتكت",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Ali Hussein",
  description: "حماية الادمنية من تغيير",
  commandCategory: "حماية",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.run = async ({ api, event, Threads }) => {
  const threadID = event.threadID;

  // Load the current admin list and protection status
  const threadData = await Threads.getData(threadID);
  const protectData = threadData.data || {};
  if (!protectData.admins) {
    protectData.admins = (await api.getThreadInfo(threadID)).adminIDs.map(u => u.id);
  }

  // Toggle the protection status
  if (typeof protectData.protectAdmins === 'undefined' || protectData.protectAdmins === false) {
    protectData.protectAdmins = true;
    api.sendMessage("Protection is now enabled. Admins in this group are now protected from changes.", threadID);
  } else {
    protectData.protectAdmins = false;
    api.sendMessage("Protection is now disabled. Admins in this group are no longer protected from changes.", threadID);
  }

  // Save the updated data
  await Threads.setData(threadID, { data: protectData });
  global.data.threadData.set(parseInt(threadID), protectData);
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  const { logMessageType, logMessageData, threadID } = event;

  if (logMessageType === 'log:thread-admins' && logMessageData.ADMIN_EVENT === 'add_admin') {
    const threadData = await Threads.getData(threadID);
    const protectData = threadData.data;

    if (protectData && protectData.protectAdmins === true) {
      const userID = logMessageData.TARGET_ID;
      // Check if the user added is in the protected admins list
      if (!protectData.admins.includes(userID)) {
        // Remove the newly added admin
        api.removeUserFromGroup(userID, threadID);
        api.sendMessage(`Protected mode is active. The user is not allowed to become an admin.`, threadID);
      }
    }
  } else if (logMessageType === 'log:thread-admins' && logMessageData.ADMIN_EVENT === 'remove_admin') {
    const threadData = await Threads.getData(threadID);
    const protectData = threadData.data;

    if (protectData && protectData.protectAdmins === true) {
      const userID = logMessageData.TARGET_ID;
      // Check if the admin removed is in the protected admins list
      if (protectData.admins.includes(userID)) {
        // Re-add the removed admin
        api.addUserToGroup(userID, threadID);
        api.sendMessage(`Protected mode is active. The admin cannot be removed.`, threadID);
        // Remove the admin who attempted to remove the protected admin
        api.removeUserFromGroup(logMessageData.ACTOR_ID, threadID);
      }
    }
  }
};
