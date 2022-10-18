import { CadenaConexion, ConnectionBD } from '../h.function'

export async function NewUser(req, res) {

    var params = req.body;

    var VarName = params.Name
    var VarUsername = params.Username
    var VarEmail = params.Email
    var VarPhone = params.Phone
    var VarWebsite = params.Website
    var VarStreet = params.Street
    var VarSuite = params.Suite
    var VarCity = params.City
    var VarZipcode = params.Zipcode
    var VarLat = params.Lat
    var VarLng = params.Lng
    var VarCompanyName = params.CompanyName
    var VarCatchphrase = params.Catchphrase
    var VarBs = params.Bs


    var UserId;
    var AddressId;
    var CompanyId;


    const Conection = CadenaConexion("sv1919");
    const CnxBD = ConnectionBD(Conection.NomBD, Conection.UserBD, Conection.PwdBD, Conection.HostBD, Conection.Port);

    var sql = `SELECT nextval('sq_user');`;
    const Resp0 = await CnxBD.query(sql).catch(err => {
        console.log(`253 - ${err.message}`)
    });

    UserId = parseInt(Resp0[0][0]['nextval']);


    var sqlUSer = `INSERT INTO appuser(id, name, username, email, phone, website) VALUES (:paramid, :paramname, :paramusername, :paramemail, :paramphone, :paramwebsite)`
    var remUSer = {}

    var sql1 = `SELECT nextval('sq_address');`;
    const Resp1 = await CnxBD.query(sql1).catch(err => {
        console.log(`253 - ${err.message}`)
    });

    AddressId = parseInt(Resp1[0][0]['nextval']);

    var sqlAddress = `INSERT INTO address(street, userid, id, suite, city, zipcode, lat, lng) 
                    VALUES (:paramstreet, :paramuserid, :paramid, :paramsuite, :paramcity, :paramzipcode, :paramlat, :paramlng)`
    var remAddress = {}

    var sql2 = `SELECT nextval('sq_company');`;
    const Resp2 = await CnxBD.query(sql2).catch(err => {
        console.log(`253 - ${err.message}`)
    });

    CompanyId = parseInt(Resp2[0][0]['nextval']);

    var sqlCompany = `INSERT INTO company(id, name, catchphrase, bs, userid) VALUES (:paramid, :paramname, :paramcatchphrase, :parambs, :paramuserid)`
    var remCompany = {}


    remUSer = {
        replacements: {
            paramid: UserId,
            paramname: VarName,
            paramusername: VarUsername,
            paramemail: VarEmail,
            paramphone: VarPhone,
            paramwebsite: VarWebsite,
        }
    }
    remAddress = {
        replacements: {
            paramstreet: VarStreet,
            paramuserid: UserId,
            paramid: AddressId,
            paramsuite: VarSuite,
            paramcity: VarCity,
            paramzipcode: VarZipcode,
            paramlat: VarLat,
            paramlng: VarLng,
        }
    }
    remCompany = {
        replacements: {
            paramid: CompanyId,
            paramname: VarCompanyName,
            paramcatchphrase: VarCatchphrase,
            parambs: VarBs,
            paramuserid: UserId,
        }
    }

    // SE INSERTAN LOS REGISTRO DEL USUARIO
    //APPUSER INFORMACION GENERAL DEL USUARIO
    await CnxBD.query(sqlUSer, remUSer).catch(err1 => {
        return res.status(200).json({
            Message: "123-" + err1.message
        })
    });

    //DIRECCION DEL USUARIO 
    await CnxBD.query(sqlAddress, remAddress).catch(err2 => {
        return res.status(200).json({
            Message: "456-" + err2.message
        })
    });

    //COMPAÑIA DEL USUARIO
    await CnxBD.query(sqlCompany, remCompany).catch(err3 => {
        return res.status(200).json({
            Message: "789-" + err3.message
        })
    });

    return res.status(200).json({
        Message: "",
        userid: UserId,
        addressid: AddressId,
        companyid: CompanyId,
    })
}

export async function ReadUsers(req, res) {

    const Conection = CadenaConexion("sv1919");
    const CnxBD = ConnectionBD(Conection.NomBD, Conection.UserBD, Conection.PwdBD, Conection.HostBD, Conection.Port);


    var sqlUSers = `
        SELECT a.id AS userid, a.name, a.username, a.email, a.phone, a.website, 
        b.id AS addressid, b.street, b.suite, b.city, b.zipcode, b.lat, b.lng,
        c.id AS companyid, c.name AS companyname, c.catchphrase, c.bs 
        FROM appuser a INNER JOIN address b ON (a.id = b.userid) INNER JOIN company c ON (a.id = c.userid) ORDER BY a.id
    `

    const Resp0 = await CnxBD.query(sqlUSers).catch(err0 => {
        return res.status(200).json({
            Message: "624-" + err0.message
        })
    });

    return res.status(200).json({
        Users: Resp0[0],
        Message: ""
    })
}

export async function UpdateUser(req, res) {

    var params = req.body;

    var UserId = params.UserId
    var VarAddressId = params.AddressId
    var VarCompanyId = params.CompanyId
    var VarName = params.Name
    var VarUsername = params.Username
    var VarEmail = params.Email
    var VarPhone = params.Phone
    var VarWebsite = params.Website

    var VarStreet = params.Street
    var VarSuite = params.Suite
    var VarCity = params.City
    var VarZipcode = params.Zipcode
    var VarLat = params.Lat
    var VarLng = params.Lng

    var VarCompanyName = params.CompanyName
    var VarCatchphrase = params.Catchphrase
    var VarBs = params.Bs

    const Conection = CadenaConexion("sv1919");
    const CnxBD = ConnectionBD(Conection.NomBD, Conection.UserBD, Conection.PwdBD, Conection.HostBD, Conection.Port);


    var sqlUSer = `UPDATE appuser SET name=:paramname, username=:paramusername, email=:paramemail,
    phone=:paramphone, website=:paramwebsite WHERE id=:paramid`

    var sqlAddress = `UPDATE address SET street=:paramstreet, suite=:paramsuite, city=:paramcity, zipcode=:paramzipcode, lat=:paramlat, lng=:paramlng WHERE id=:paramid`

    var sqlCompany = `UPDATE company SET name=:paramname, catchphrase=:paramcatchphrase, bs=:parambs WHERE id=:paramid`


    var remUSer = {
        replacements: {
            paramid: UserId,
            paramname: VarName,
            paramusername: VarUsername,
            paramemail: VarEmail,
            paramphone: VarPhone,
            paramwebsite: VarWebsite,
        }
    }
    var remAddress = {
        replacements: {
            paramstreet: VarStreet,
            paramid: VarAddressId,
            paramsuite: VarSuite,
            paramcity: VarCity,
            paramzipcode: VarZipcode,
            paramlat: VarLat,
            paramlng: VarLng,
        }
    }
    var remCompany = {
        replacements: {
            paramname: VarCompanyName,
            paramcatchphrase: VarCatchphrase,
            parambs: VarBs,
            paramid: VarCompanyId,
        }
    }

    // SE INSERTAN LOS REGISTRO DEL USUARIO
    //APPUSER INFORMACION GENERAL DEL USUARIO
    await CnxBD.query(sqlUSer, remUSer).catch(err1 => {
        return res.status(200).json({
            Message: "123-" + err1.message
        })
    });

    //DIRECCION DEL USUARIO 
    await CnxBD.query(sqlAddress, remAddress).catch(err2 => {
        return res.status(200).json({
            Message: "456-" + err2.message
        })
    });

    //COMPAÑIA DEL USUARIO
    await CnxBD.query(sqlCompany, remCompany).catch(err3 => {
        return res.status(200).json({
            Message: "789-" + err3.message
        })
    });

    return res.status(200).json({
        Message: ""
    })
}

export function DeleteUser(req, res) {

    var params = req.body;

    var UserId = params.UserId
    var VarAddressId = params.AddressId
    var VarCompanyId = params.CompanyId


    const Conection = CadenaConexion("sv1919");
    const CnxBD = ConnectionBD(Conection.NomBD, Conection.UserBD, Conection.PwdBD, Conection.HostBD, Conection.Port);

    var sql = `
            DELETE FROM address WHERE id=:paramidaddress;
            DELETE FROM company WHERE id=:paramidcompany;
            DELETE FROM appuser WHERE id=:paramiduser;
        `;

    var rem = {
        replacements: {
            paramidaddress: VarAddressId,
            paramidcompany: VarCompanyId,
            paramiduser: UserId,
        }
    }

    CnxBD.query(sql, rem).then(resp => {
        return res.status(200).json({
            Message: ""
        })
    }).catch(err => {
        return res.status(200).json({
            Message: err.message
        })
    });
}