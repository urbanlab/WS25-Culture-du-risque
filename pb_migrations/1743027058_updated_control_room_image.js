/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2825399239")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file4170105732",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "sound",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2825399239")

  // remove field
  collection.fields.removeById("file4170105732")

  return app.save(collection)
})
