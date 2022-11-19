const rewards = {
  exp: 99999,
  money: 44999,
  potion: 10,
}
const cooldown = 8000
let handler = async (m,{ conn} ) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastclaim < cooldown) throw `You have already claimed this daily claim!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  conn.sendButton(m.chat,'*––––––『 CHEAT 』––––––*', text.trim(), null, [['Inventory', '.inv'], ['Weekly', '.weekly']],m)
  user.lastclaim = new Date * 1
}
handler.help = ['daily', 'claim']
handler.tags = ['xp']
handler.command = /^(fromobet|hadiahobet)$/i

handler.cooldown = cooldown

export default handler