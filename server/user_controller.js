module.exports = {

  user_by_id: (req, res, next) => {
    req.app.get('db').users.user_by_id(req.params.id).then(response => res.status(200).send(response))
  },

  edit_user: (req, res, next) => {
    
    let { user_name, email, phone, company, website, authid } = req.body;    
    req.app.get('db').users.edit_user(user_name, email, phone, company, website, authid)
      .then(() => res.status(200).send())
  }


}