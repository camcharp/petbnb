const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    catname: { type: String, required: true },
    age: { type: Number, required: true },
    genre: { type: String, required: true, enum: ["male", "female"] },
    personality: {
      type: String,
      enum: [
        "calm",
        "lazy",
        "cuddly",
        "loner",
        "playful",
        "big eater",
        "grumpy",
        "evil"
      ]
    },
    catavatar: { type: String, default: "/images/cat_icon.png" },
    rate: { type: Number, min: 0, max: 5 }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;

/* Cat.create({ catname: 'Blabla', age: 2, genre: 'female', personality: 'evil', image:'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg' })
  .then(cat => { console.log('The cat is saved and its value is: ', cat) })
  .catch(err => { console.log('An error happened:', err) }); 
 */
