//Globals
var SERVER = "mongodb"
var CONECTION = "localhost:27017"
var DB = "RentACar"
var PATH = SERVER + "://" + CONECTION + "/" + DB
var SERVERPORT = 3002;

//require
var express = require("express")
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//host
var server = app.listen(SERVERPORT, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("App escuchando en http://%s:%s",host,port);
})

//db conection
mongoose.connect("mongodb://localhost:27017/RentACar",{ useNewUrlParser: true }, () => {
  console.log("DB is connected")
})

//////////////////////////////////SCHEMAS///////////////////////////////////////////

var vehicleSchema = new mongoose.Schema({
  placa: String,
  capacidad: Number,
  idMarca: Number,
  idEstilo: Number,
  modelo: String,
  color: String,
  cilindrada: Number,
  combustible: String,
  transmision: String,
  año: String,
  extras: Array,
  precioDia: Number,
  estado: String
})

var rentaSchema = new mongoose.Schema({
    placa: String,
    cedula: Number,
    cant_dias: Number,
    monto: Number
})

var personaSchema = new mongoose.Schema({
    cedula: Number,
    nombre: String,
    correo: String,
    telefonos: Array
})

var estiloSchema = new mongoose.Schema({
    idEstilo: String,
    estilo: String
})

//////////////////////////////////MODELS///////////////////////////////////////////
/* 
var vehicleModel = mongoose.model("vehicle", {
    placa: String,
    capacidad: Number,
    idMarca: Number,
    idEstilo: Number,
    modelo: String,
    color: String,
    cilindrada: Number,
    combustible: String,
    transmision: String,
    año: String,
    extras: Array,
    precioDia: Number,
    estado: String
  }) */

  var rentaModel = mongoose.model("renta", {
    placa: String,
    cedula: Number,
    cant_dias: Number,
    monto: Number
})

var personaModel = mongoose.model("persona", {
    cedula: Number,
    nombre: String,
    correo: String,
    telefonos: Array
})

    var estiloModel = mongoose.model("estilo", {
        idEstilo: String,
        estilo: String
    })

///////////////////////////////////CRUD VEHICULOS/////////////////////////////////////////////
//get todos los vehiculos
app.get("/vehiculos", function(req,res,next){
        var vehiculo = vehicleModel;
        vehiculo.find({ }, function (err, vehiculos) {
            if (err) return handleError(err);
            res.send(JSON.stringify(vehiculos))
        })
  });


//get vehiculo por placa
app.get("/vehiculo/placa", function(req,res,next){
    var placa = req.query.placa;
    if(placa){
        var vehiculo = mongoose.model('vehicle', vehicleSchema);
        vehiculo.find({'placa': placa}, function (err, vehiculos) {
            if (err) return handleError(err);
            res.send(JSON.stringify(vehiculos))
        })
    }
    else{
        res.send(JSON.stringify("[{ID Vacío}]"))
    }
});

//get vehiculo por rango
app.get("/vehiculo/rango", function(req,res,next){
  var rango1 = req.query.rango1;
  var rango2 = req.query.rango2;
  if(rango1){
      var vehiculo = mongoose.model('vehicle', vehicleSchema);
      vehiculo.find({'precioDia': { "$gt": rango1, "$lte": rango2}}, function (err, vehiculos) {
          if (err) return handleError(err);
          res.send(JSON.stringify(vehiculos))
      })
  }
  else{
      res.send(JSON.stringify("[{ID Vacío}]"))
  }
});

//get vehiculo por marca
app.get("/vehiculo/marca", function(req,res,next){
  var marca = req.query.marca;
  if(marca){
      var vehiculo = mongoose.model('vehicle', vehicleSchema);
      vehiculo.find({'idMarca': marca}, function (err, vehiculos) {
          if (err) return handleError(err);
          res.send(JSON.stringify(vehiculos))
      })
  }
  else{
      res.send(JSON.stringify("[{ID Vacío}]"))
  }
});

//get vehiculo por modelo
app.get("/vehiculo/modelo", function(req,res,next){
  var modelo = req.query.modelo;
  if(modelo){
      var vehiculo = mongoose.model('vehicle', vehicleSchema);
      vehiculo.find({'modelo': modelo}, function (err, vehiculos) {
          if (err) return handleError(err);
          res.send(JSON.stringify(vehiculos))
      })
  }
  else{
      res.send(JSON.stringify("[{ID Vacío}]"))
  }
});


//get vehiculo por modelo
app.get("/vehiculo/top", function(req,res,next){
  var modelo = req.query.modelo;
  if(modelo){
      var vehiculo = mongoose.model('vehicle', vehicleSchema);
      vehiculo.find({'modelo': modelo}, function (err, vehiculos) {
          if (err) return handleError(err);
          res.send(JSON.stringify(vehiculos))
      })
  }
  else{
      res.send(JSON.stringify("[{ID Vacío}]"))
  }
});



//crea un vehiculo
app.put("/vehiculo", function(req,res,next){
  var placa = req.query.placa;
  var capacidad = req.query.capacidad;
  var idMarca = req.query.idmarca;
  var idEstilo = req.query.idestilo;
  var modelo = req.query.modelo;
  var color = req.query.color;
  var cilindrada = req.query.cilindrada;
  var transmision = req.query.transmision;
  var combustible = req.query.combustible;
  var ano = req.query.año;
  var extras = req.query.extras;
  var precio_dia = req.query.precio;
  var estado = req.query.estado;
              var newVehiculo = {
                placa: placa,
                capacidad: capacidad,
                idMarca: idMarca,
                idEstilo: idEstilo,
                modelo: modelo,
                color: color,
                cilindrada:cilindrada,
                combustible: combustible,
                transmision: transmision,
                año: ano,
                extras: extras,
                precio_dia: precio_dia,
                estado: estado
              }
              new vehicleModel(newVehiculo).save();
              res.send(JSON.stringify(newVehiculo));
});

//borra un vehiculo
app.delete("/vehiculo", function(req,res,next){
  var placa = req.query.placa;
  if(placa){
      var vehicle = vehicleModel;
      vehicle.findOneAndRemove({ 'placa': placa}, function (err, vehicles) {
      if (err) return handleError(err);
      res.send(JSON.stringify(vehicles))
      })
  }
  else{
      res.send(JSON.stringify("[{placa vacia}]"))
  }
});

///////////////////////////////////CRUD ESTILOS/////////////////////////////////////////////

//get todos los estilos
app.get("/estilos", function(req,res,next){
    var estilo = estiloModel;
    estilo.find({ }, function (err, estilos) {
        if (err) return handleError(err);
        res.send(JSON.stringify(estilos))
    })
});


//get estilo por id
app.get("/estilo", function(req,res,next){
var id = req.query.id;
if(id){
    var estilo = mongoose.model('estilo', estiloSchema);
    estilo.find({'id': id}, function (err, estilos) {
        if (err) return handleError(err);
        res.send(JSON.stringify(estilos))
    })
}
else{
    res.send(JSON.stringify("[{ID Vacío}]"))
}
});


//crea un estilo
app.put("/estilo", function(req,res,next){
var id = req.query.id;
var estilo = req.query.estilo;
          var newEstilo = {
            id: id,
            estilo: estilo,
          }
          new estiloModel(newEstilo).save();
          res.send(JSON.stringify(newEstilo));
});

//borra un estilo
app.delete("/estilo", function(req,res,next){
var id = req.query.id;
if(id){
  var estilo = estiloModel;
  estilo.findOneAndRemove({ 'id': id}, function (err, estilos) {
  if (err) return handleError(err);
  res.send(JSON.stringify(estilos))
  })
}
else{
  res.send(JSON.stringify("[{id vacio}]"))
}
});

///////////////////////////////////CRUD PERSONAS/////////////////////////////////////////////

//get todos los personas
app.get("/personas", function(req,res,next){
    var persona = personaModel;
    persona.find({ }, function (err, personas) {
        if (err) return handleError(err);
        res.send(JSON.stringify(personas))
    })
});


//get persona por cedula
app.get("/persona", function(req,res,next){
var cedula = req.query.cedula;
if(cedula){
    var persona = mongoose.model('persona', personaSchema);
    persona.find({'cedula': cedula}, function (err, personas) {
        if (err) return handleError(err);
        res.send(JSON.stringify(personas))
    })
}
else{
    res.send(JSON.stringify("[{ID Vacío}]"))
}
});


//crea una persona
app.put("/persona", function(req,res,next){
var cedula = req.query.cedula;
var nombre = req.query.nombre;
var correo = req.query.correo;
var telefonos = req.query.telefonos;
          var newPersona = {
            cedula: cedula,
            nombre: nombre,
            correo: correo,
            telefonos: telefonos,
          }
          new personaModel(newPersona).save();
          res.send(JSON.stringify(newPersona));
});

//borra una persona
app.delete("/persona", function(req,res,next){
var cedula = req.query.cedula;
if(cedula){
  var persona = personaModel;
  persona.findOneAndRemove({ 'cedula': cedula}, function (err, personas) {
  if (err) return handleError(err);
  res.send(JSON.stringify(personas))
  })
}
else{
  res.send(JSON.stringify("[{placa vacia}]"))
}
});

///////////////////////////////////CRUD RENTA/////////////////////////////////////////////

//get todos los rentas
app.get("/rentas", function(req,res,next){
    var renta = rentaModel;
    renta.find({ }, function (err, rentas) {
        if (err) return handleError(err);
        res.send(JSON.stringify(rentas))
    })
});


//get renta por cedula y placa
app.get("/renta", function(req,res,next){
var cedula = req.query.cedula;
var placa = req.query.placa;
if(cedula){
    var renta = mongoose.model('renta', rentaSchema);
    renta.find({'cedula': cedula, 'placa': placa}, function (err, rentas) {
        if (err) return handleError(err);
        res.send(JSON.stringify(rentas))
    })
}
else{
    res.send(JSON.stringify("[{ID Vacío}]"))
}
});


//crea una renta
app.put("/renta", function(req,res,next){
var cedula = req.query.cedula;
var placa = req.query.placa;
var cant_dias = req.query.cant_dias;
var monto = req.query.monto;
          var newRenta = {
            cedula: cedula,
            placa: placa,
            cant_dias: cant_dias,
            monto: monto,
          }
          new rentaModel(newRenta).save();
          res.send(JSON.stringify(newRenta));
});

//borra una renta
app.delete("/renta", function(req,res,next){
var cedula = req.query.cedula;
var placa = req.query.placa;
if(cedula){
  var renta = rentaModel;
  renta.findOneAndRemove({ 'cedula': cedula, 'placa': placa}, function (err, rentas) {
  if (err) return handleError(err);
  res.send(JSON.stringify(rentas))
  })
}
else{
  res.send(JSON.stringify("[{placa vacia}]"))
}
});
