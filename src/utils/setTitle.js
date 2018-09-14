export default function (title) {
  let bridge = window.incarBridge

  if (bridge && bridge.updateTitle) {
    bridge.updateTitle(JSON.stringify({
      title: title
    }))
  }

  document.title = title
}
