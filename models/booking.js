const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
	{
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		host_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Host' },
		startDate: { type: Date },
		endDate: { type: Date },
		userRate: { type: Number },
		hostRate: { type: Number },
		price : { type: Number },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

// Booking.findOne({ _id: 123 }).populate('user_id').exec(function(err, post) {}); */

/* Booking.create({ })
  .then(booking => { console.log('The booking is saved and its value is: ', booking) })
  .catch(err => { console.log('An error happened:', err) }); 
*/
