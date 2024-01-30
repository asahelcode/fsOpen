const express = require('express')
const notesRouter = express.Router()

const Note = require('../models/notes')

notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id).then(note => {
    if(note) {
      res.json(note)
    }else {
      res.status(404).end()
    }
  }).catch(err => next(err))
})

notesRouter.post('/', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save().then(note => res.json(note)).catch(err => next(err))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter