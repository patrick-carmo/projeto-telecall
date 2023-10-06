const limparTodosCookies = (req, res) => {
  const cookies = Object.keys(req.cookies)
  
  for (let cookie of cookies) {
    res.clearCookie(cookie)
  }
}

module.exports = limparTodosCookies