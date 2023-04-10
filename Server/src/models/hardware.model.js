const mongoose = require('mongoose');

// const HardwareSchema = mongoose.Schema({
//   name: String,
//   category: String,
//   price_usd: Number,

//   type: String,
//   side_panel_window: String,
//   internal_3_5_bays: String || Number,

//   core_count: String || Number,
//   core_clock: String,
//   boost_clock: String,
//   tdp: String || Number,
//   integrated_graphics: String,

//   chipset: String,

//   cpu_socket: String,
//   form_factor: String,
//   memory_max: String,
//   memory_slots: Number,

//   resolution: String,
//   refresh_rate: String,

//   efficiency_rating: String,
//   wattage: String,
//   modular: String,

//   speed: String,
//   modules: String,

//   capacity: String,
//   interface: String,
// })
const HardwareSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the hardware is required']
  },
  category: {
    type: String,
    required: [true, 'Category of the hardware is required']
  },
  price_usd: Number,

  type: String,
  side_panel_window: String,
  internal_3_5_bays: String,

  core_count: String,
  core_clock: String,
  boost_clock: String,
  tdp: String,
  integrated_graphics: String,

  chipset: String,

  cpu_socket: String,
  form_factor: String,
  memory_max: String,
  memory_slots: Number,

  resolution: String,
  refresh_rate: String,

  efficiency_rating: String,
  wattage: String,
  modular: String,

  speed: String,
  modules: String,

  capacity: String,
  interface: String,
})

module.exports = mongoose.model('Hardware', HardwareSchema);