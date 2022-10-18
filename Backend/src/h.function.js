import Sequelize from 'sequelize';
import axios from "axios";

// LEER EL ARCHOV .CFG
export function CadenaConexion(req, res) {

    var fs = require('fs');

    var phcode = req;
    var path = '//DATASRV/GoPHDocs/AppConx/';
    var fileName = path + phcode + '.cfg';
    let data = []

    // Check if the file exists 
    let fileExists = fs.existsSync(fileName, 'utf8');

    // If the file does not exist 
    if (!fileExists) {
        return fileExists;
    } else {
        data = fs.readFileSync(fileName, 'utf8');

        // SEPARAR LA CADENA DONDE HAYA UN ';'
        var datos = data.split(";");

        // PASAR CADA DATO SEPARADO EN UNA VARIABLE
        var vservidor = datos[0].split('@')[1];
        var vdatabase = datos[1].split('@')[1];
        var vusuaraio = datos[2].split('@')[1];
        var vpassword = datos[3].split('@')[1];
        var vpuerto = datos[4].split('=')[1];

        // JUNTAR LAS VARIABLES NDEPENDIENTES A UNA CADENA TIPO JSON
        var jsonString = JSON.stringify({ HostBD: vservidor, NomBD: vdatabase, UserBD: vusuaraio, PwdBD: vpassword, Port: vpuerto })

        // PARSEAR A JSON
        var Respuesta = JSON.parse(jsonString);

        return Respuesta;
    }
};

// CONEXION A LA BASE DE DATOS
export function ConnectionBD(NomBD, UserBD, PwdBD, HostBD, PortBD) {
    var VarBD = NomBD;
    var User = UserBD;
    var Pwd = PwdBD;
    var VarHost = HostBD;
    var VarPort = PortBD;

    const CnxBD = new Sequelize(
        VarBD,
        User,
        Pwd,
        {
            host: VarHost,
            port: VarPort,
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                require: 30000,
                idle: 10000
            },
            timezone: "-05:00",
            logging: false
        }
    );

    return CnxBD;
};

export async function PlaceHolderUser() {
    axios.get('https://jsonplaceholder.typicode.com/users').then(async (Resp) => {
        // CONNECTION TO DATA BASE (NAME DATA BASE, USER, "PASSWSORD", "HOST", "PORT")
        const Conection = CadenaConexion("sv1919");
        const CnxBD = ConnectionBD(Conection.NomBD, Conection.UserBD, Conection.PwdBD, Conection.HostBD, Conection.Port);

        /* ELIMINAR REGSITROS PREVIOS PARA VOLVER A LLEVAR LA BASE DE DATOS */
        var sql = `
            DELETE FROM address;
            DELETE FROM company;
            DELETE FROM appuser;
        `;
        CnxBD.query(sql).catch(err => {
            console.log(`2463 - ${err.message}`)
        });

        var sqlUSer = `INSERT INTO appuser(id, name, username, email, phone, website) VALUES (:paramid, :paramname, :paramusername, :paramemail, :paramphone, :paramwebsite)`
        var remUSer = {}

        var sqlAddress = `INSERT INTO address(street, userid, suite, city, zipcode, lat, lng) 
                        VALUES (:paramstreet, :paramuserid, :paramsuite, :paramcity, :paramzipcode, :paramlat, :paramlng)`
        var remAddress = {}

        var sqlCompany = `INSERT INTO company(name, catchphrase, bs, userid) VALUES (:paramname, :paramcatchphrase, :parambs, :paramuserid)`
        var remCompany = {}

        if (Resp.data.length > 0) {

            var data = Resp.data;

            for (var i = 0; i < data.length; i++) {

                remUSer = {
                    replacements: {
                        paramid: data[i].id,
                        paramname: data[i].name,
                        paramusername: data[i].username,
                        paramemail: data[i].email,
                        paramphone: data[i].phone,
                        paramwebsite: data[i].website,
                    }
                }
                remAddress = {
                    replacements: {
                        paramstreet: data[i].address.street,
                        paramuserid: data[i].id,
                        paramsuite: data[i].address.suite,
                        paramcity: data[i].address.city,
                        paramzipcode: data[i].address.zipcode,
                        paramlat: data[i].address.geo.lat,
                        paramlng: data[i].address.geo.lng,
                    }
                }
                remCompany = {
                    replacements: {
                        paramname: data[i].company.name,
                        paramcatchphrase: data[i].company.catchPhrase,
                        parambs: data[i].company.bs,
                        paramuserid: data[i].id,
                    }
                }

                // SE INSERTAN LOS REGISTRO DEL USUARIO
                //APPUSER INFORMACION GENERAL DEL USUARIO
                await CnxBD.query(sqlUSer, remUSer).catch(err1 => {
                    console.log("123-" + err1.message)
                });

                //DIRECCION DEL USUARIO 
                await CnxBD.query(sqlAddress, remAddress).catch(err2 => {
                    console.log("456-" + err2.message)
                });

                //COMPAÑIA DEL USUARIO
                await CnxBD.query(sqlCompany, remCompany).catch(err3 => {
                    console.log("789-" + err3.message)
                });
            }

        } else {
            console.log("There is no data to submit")
        }
    }).catch(err => {
        console.log(`975 - ${err.message}`)
    });
}