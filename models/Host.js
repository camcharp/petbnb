const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
    homeType: { type: String, required: true, enum:['house','flat'] },
    hasGarden: { type: Boolean, required: true },
    howManyAnimals: { type: Number, required: true },
    priceDay: { type: Number, max: 50, required: true },
    rate: { type: Number, min: 0, max: 5 }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Host = mongoose.model('Host', hostSchema);
module.exports = User;

/* Host.create({
  user_id: '5d19fbd16d2f2d0eb8690a35',
  street: 'rue lalala',
  city: 'Paris',
  zipCode: '75000',
  homeType: 'flat',
  garden: true,
  howManyAnimals: 0,
  priceDay: 12,
  rate: 4
})
  .then((host) => {
    console.log('The host is saved and its value is: ', host);
  })
  .catch((err) => {
    console.log('An error happened:', err);
  }); */
