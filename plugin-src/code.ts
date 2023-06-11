figma.showUI(__html__, { themeColors: true, height: 450, width: 600 });

let token: string | null = null;

figma.clientStorage.getAsync("token")
  .then(existedToken => {
    if (existedToken) {
      token = existedToken;
      figma.ui.postMessage({ type: "portal" });
    } else {
      figma.ui.postMessage({ type: "login" });
    }
  })

figma.ui.onmessage = async (msg) => {
  if (msg.type.startsWith('auth:')) {
    if (msg.type === 'auth:received-token') {
      token = msg.data;
      await figma.clientStorage.setAsync("token", token);
      figma.ui.postMessage({ type: "portal" });

      return
    }

    if (msg.type === 'auth:logout') {
      token = null;
      await figma.clientStorage.setAsync("token", token);
      figma.ui.postMessage({ type: "login" });

      return
    }
  }

  figma.closePlugin();
};
