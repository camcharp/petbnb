const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const catSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    genre: { type: String, required: true, enum: [ 'male', 'female' ] },
    personality: {
      type: String,
      //enum: [ 'calm', 'lazy', 'cuddly', 'loner', 'playful', 'big eater', 'grumpy', 'evil' ]
    },
    image: {type: String},
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;

Cat.create({ name: 'Blabla', age: 2, genre: 'male', personality: 'big eater', image:'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg' })
  .then(cat => { console.log('The cat is saved and its value is: ', cat) })
  .catch(err => { console.log('An error happened:', err) });  
