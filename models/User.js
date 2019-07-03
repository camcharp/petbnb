const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		password: { type: String, required: true },
		avatar: { type: String, required: true, default:'/images/default_user.jpg'},
		cats: [{ type: Schema.Types.ObjectId, ref: "Cat" }],
		rate: { type: Number, default: 0 },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const User = mongoose.model('User', userSchema);
module.exports = User;

/*  User.create({ name: 'Blabla', lastname: 'Lalala', email: 'blabla@lala.com', password: 'password', })
  .then(user => { console.log('The user is saved and its value is: ', user) })
  .catch(err => { console.log('An error happened:', err) });  */