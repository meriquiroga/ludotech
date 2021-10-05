const Article = require('../models/Article')

const articlesControllers = {
  
  addArticle: async (req,res) => {
    try {
      let article = new Article({ ...req.body })
      let newArticle = article.save()
      if (newArticle) {
        res.json({ success: true, response: newArticle, error: null})
      } else {
        throw new Error('Couldn´t save the new article')
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },

  getArticle: async (req,res) => {
    try {
      let getArticle = await Article.find({ _id: req.params.id})
      if (getArticle) {
        res.json({ success: true, response: getArticle, error: null })
      } else {
        throw new Error('Couldn´t get the article')
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })    
    }
  },

  // se requiere filtros como {filters} en el body; puede venir vacio
  getAllArticles: async (req,res) => {
    try {
      if (Object.keys(req.body.filters).length === 0) {
        let getArticles = await Article.find()
        if (getArticles) {
          res.json({ success: true, response: getArticles, error: null })
        } else {
          throw new Error('Couldn´t get all articles')
        }
      } else {
        let getArticles = await Article.find({ ...req.body.filters, minPlayers: { $gte: req.body.filters.minPlayers || null }, maxPlayers: { $lte: req.body.filters.maxPlayers || null }, minAge: { $gte: req.body.filters.minAge || null }}) 
        if (getArticles) {
          res.json({ success: true, response: getArticles, error: null })
        } else {
          throw new Error('Couldn´t get the filtered articles')
        }
      }
    } catch (error) {
      res.json({ success: false, response: null, error: e.message })
    }
  },

  updateArticle: async (req,res) => {
    try {
      let updateArticle = await Article.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
      if (updateArticle) {
        res.json({ success: true, response: updateArticle, error: null })
      } else {
        throw new Error('Couldn´t update the article')
      }
    } catch (error) {
      res.json({ success: false, response: null, error: e.message })
    }
  },

  deleteArticle: async (req,res) => {
    try {
      let deleteArticle = await Article.findOneAndDelete({ _id: req.params.id })
      if (deleteArticle) {
        res.json({ success: true, response: deleteArticle, error: null })
      } else {
        throw new Error('Couldn´t delete the article')
      }
    } catch (error) {
      res.json({ success: false, response: null, error: e.message })    
    }
  },
}

module.exports = articlesControllers