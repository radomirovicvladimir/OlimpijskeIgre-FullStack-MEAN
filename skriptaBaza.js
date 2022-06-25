conn = new Mongo();
db = conn.getDB("olimpijada");

db.createCollection("participants");

db.participants.insertMany(/* 1 */
[{
    "_id" : ObjectId("611e7efb0ebe5b2cac78a3ce"),
    "disciplines" : [ 
        "Long Jump", 
        "100m", 
        "200m"
    ],
    "competitions" : [],
    "firstname" : "Ivana",
    "lastname" : "Spanovic",
    "country" : "Serbia",
    "gender" : "female",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 2,
        "silver" : 0,
        "bronze" : 0
    },
    "__v" : 0
},

/* 2 */
{
    "_id" : ObjectId("611e7f160ebe5b2cac78a3cf"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "Novak",
    "lastname" : "Djokovic",
    "country" : "Serbia",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 3,
        "silver" : 0,
        "bronze" : 2
    },
    "__v" : 0
},

/* 3 */
{
    "_id" : ObjectId("612113c275aecf0d2c55cbc6"),
    "disciplines" : [ 
        "100m"
    ],
    "competitions" : [],
    "firstname" : "Asmir",
    "lastname" : "Kolasinac",
    "country" : "Serbia",
    "gender" : "male",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 1,
        "silver" : 0,
        "bronze" : 1
    },
    "__v" : 0
},

/* 4 */
{
    "_id" : ObjectId("612117b575aecf0d2c55cbc9"),
    "disciplines" : [ 
        "100m"
    ],
    "competitions" : [],
    "firstname" : "Trayvon",
    "lastname" : "Bromell ",
    "country" : "The United States of America",
    "gender" : "male",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 2,
        "silver" : 1,
        "bronze" : 1
    },
    "__v" : 0
},

/* 5 */
{
    "_id" : ObjectId("6121191875aecf0d2c55cbce"),
    "disciplines" : [ 
        "100m", 
        "100m"
    ],
    "competitions" : [],
    "firstname" : "Lamont ",
    "lastname" : "Marcell ",
    "country" : "Italy",
    "gender" : "male",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 1,
        "silver" : 2,
        "bronze" : 0
    },
    "__v" : 0
},

/* 6 */
{
    "_id" : ObjectId("6121198f75aecf0d2c55cbcf"),
    "disciplines" : [ 
        "100m"
    ],
    "competitions" : [],
    "firstname" : "Andre",
    "lastname" : "De Grasse",
    "country" : "Canada",
    "gender" : "male",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 0,
        "bronze" : 1
    },
    "__v" : 0
},

/* 7 */
{
    "_id" : ObjectId("612264d6d4a955160cdb9dd3"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "A",
    "lastname" : "A",
    "country" : "The United States of America",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 1,
        "bronze" : 1
    },
    "__v" : 0
},
/* 8 */
{
    "_id" : ObjectId("612264e7d4a955160cdb9dd4"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "B",
    "lastname" : "B",
    "country" : "Canada",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 2,
        "bronze" : 1
    },
    "__v" : 0
},

/* 9 */
{
    "_id" : ObjectId("61226500d4a955160cdb9dd5"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "C",
    "lastname" : "C",
    "country" : "Italy",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 1,
        "silver" : 0,
        "bronze" : 0
    },
    "__v" : 0
},

/* 10 */
{
    "_id" : ObjectId("61226697d4a955160cdb9dde"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "D",
    "lastname" : "D",
    "country" : "France",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 0,
        "bronze" : 0
    },
    "__v" : 0
},

/* 11 */
{
    "_id" : ObjectId("612266a9d4a955160cdb9ddf"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "E",
    "lastname" : "E",
    "country" : "China",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 0,
        "bronze" : 0
    },
    "__v" : 0
},

/* 12 */
{
    "_id" : ObjectId("612266bad4a955160cdb9de0"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "F",
    "lastname" : "F",
    "country" : "Australia",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 1,
        "bronze" : 0
    },
    "__v" : 0
},

/* 13 */
{
    "_id" : ObjectId("612266e4d4a955160cdb9de1"),
    "disciplines" : [ 
        "Singles"
    ],
    "competitions" : [],
    "firstname" : "G",
    "lastname" : "G",
    "country" : "Great Britain",
    "gender" : "male",
    "sport" : "Tennis",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 0,
        "bronze" : 0
    },
    "__v" : 0
},

/* 14 */
{
    "_id" : ObjectId("613202afbdf8671dd061f359"),
    "disciplines" : [ 
        "50m Rifle 3 Positions"
    ],
    "competitions" : [],
    "firstname" : "A",
    "lastname" : "USA",
    "country" : "The United States of America",
    "gender" : "male",
    "sport" : "Shooting",
    "type" : "individual",
    "medals" : {
        "gold" : 2,
        "silver" : 0,
        "bronze" : 0
    },
    "__v" : 0
},

/* 15 */
{
    "_id" : ObjectId("613202bfbdf8671dd061f35a"),
    "disciplines" : [ 
        "50m Rifle 3 Positions"
    ],
    "competitions" : [],
    "firstname" : "B",
    "lastname" : "Italy",
    "country" : "Italy",
    "gender" : "male",
    "sport" : "Shooting",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 2,
        "bronze" : 3
    },
    "__v" : 0
},

/* 16 */
{
    "_id" : ObjectId("613202d2bdf8671dd061f35b"),
    "disciplines" : [ 
        "50m Rifle 3 Positions"
    ],
    "competitions" : [],
    "firstname" : "C",
    "lastname" : "Canada",
    "country" : "Canada",
    "gender" : "male",
    "sport" : "Shooting",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 3,
        "bronze" : 2
    },
    "__v" : 0
},

/* 17 */
{
    "_id" : ObjectId("613202e5bdf8671dd061f35c"),
    "disciplines" : [ 
        "50m Rifle 3 Positions"
    ],
    "competitions" : [],
    "firstname" : "D",
    "lastname" : "Australia",
    "country" : "Australia",
    "gender" : "male",
    "sport" : "Shooting",
    "type" : "individual",
    "medals" : {
        "gold" : 3,
        "silver" : 0,
        "bronze" : 0
    },
    "__v" : 0
},

/* 18 */
{
    "_id" : ObjectId("613349c0fa44942a6065bd7b"),
    "disciplines" : [ 
        "Long Jump"
    ],
    "competitions" : [],
    "firstname" : "JumpA",
    "lastname" : "England",
    "country" : "Great Britain",
    "gender" : "female",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 0,
        "bronze" : 2
    },
    "__v" : 0
},

/* 19 */
{
    "_id" : ObjectId("613349ddfa44942a6065bd7c"),
    "disciplines" : [ 
        "Long Jump"
    ],
    "competitions" : [],
    "firstname" : "JumpB",
    "lastname" : "China",
    "country" : "China",
    "gender" : "female",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 1,
        "bronze" : 0
    },
    "__v" : 0
},

/* 20 */
{
    "_id" : ObjectId("61334a13fa44942a6065bd7d"),
    "disciplines" : [ 
        "Long Jump"
    ],
    "competitions" : [],
    "firstname" : "JumpC",
    "lastname" : "France",
    "country" : "France",
    "gender" : "female",
    "sport" : "Athletics",
    "type" : "individual",
    "medals" : {
        "gold" : 0,
        "silver" : 1,
        "bronze" : 0
    },
    "__v" : 0
}]);


db.createCollection("users");

db.users.insertMany([/* 1 */
{
    "_id" : ObjectId("611c271e4c498626986a00dd"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "1",
    "username" : "leader1",
    "password" : "123",
    "country" : "Serbia",
    "email" : "leader1@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
},

/* 2 */
{
    "_id" : ObjectId("611d311cdae796d01be21671"),
    "firstname" : "Organizer",
    "lastname" : "1",
    "password" : "123",
    "email" : "organizer@gmail.com",
    "country" : "",
    "competitions" : [],
    "status" : "approved",
    "type" : "organizer",
    "username" : "organizer"
},

/* 3 */
{
    "_id" : ObjectId("611ebecd4f000e18acb48fa1"),
    "competitions" : [],
    "firstname" : "Delegate",
    "lastname" : "1",
    "username" : "delegate1",
    "password" : "123",
    "country" : "Serbia",
    "email" : "delegate1@gmail.com",
    "type" : "delegate",
    "status" : "approved",
    "__v" : 0
},

/* 4 */
{
    "_id" : ObjectId("611ebf464f000e18acb48fa2"),
    "competitions" : [],
    "firstname" : "Delegate",
    "lastname" : "2",
    "username" : "delegate2",
    "password" : "123",
    "country" : "Serbia",
    "email" : "delegate2@gmail.com",
    "type" : "delegate",
    "status" : "approved",
    "__v" : 0
},

/* 5 */
{
    "_id" : ObjectId("6121144f75aecf0d2c55cbc8"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "USA",
    "username" : "leaderUSA",
    "password" : "123",
    "country" : "The United States of America",
    "email" : "leaderusa@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
},

/* 6 */
{
    "_id" : ObjectId("612118af75aecf0d2c55cbcb"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "Italy",
    "username" : "leaderItaly",
    "password" : "123",
    "country" : "Italy",
    "email" : "leaderItaly@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
},

/* 7 */
{
    "_id" : ObjectId("612118e875aecf0d2c55cbcd"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "Canada",
    "username" : "leaderCanada",
    "password" : "123",
    "country" : "Canada",
    "email" : "leaderCanada@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
},

/* 8 */
{
    "_id" : ObjectId("61226534d4a955160cdb9dd7"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "China",
    "username" : "leaderChina",
    "password" : "123",
    "country" : "China",
    "email" : "leaderchina@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
},

/* 9 */
{
    "_id" : ObjectId("6122657ad4a955160cdb9dd9"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "England",
    "username" : "leaderEngland",
    "password" : "123",
    "country" : "Great Britain",
    "email" : "leaderengland@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
},

/* 10 */
{
    "_id" : ObjectId("6122662ad4a955160cdb9ddb"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "Australia",
    "username" : "leaderAustralia",
    "password" : "123",
    "country" : "Australia",
    "email" : "leaderaustralia@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
},

/* 11 */
{
    "_id" : ObjectId("61226640d4a955160cdb9ddd"),
    "competitions" : [],
    "firstname" : "Leader",
    "lastname" : "France",
    "username" : "leaderFrance",
    "password" : "123",
    "country" : "France",
    "email" : "leaderfrance@gmail.com",
    "type" : "leader",
    "status" : "approved",
    "__v" : 0
}]);
db.createCollection("countries");

db.countries.insertMany([/* 1 */
{
    "_id" : ObjectId("611c20d67365a00b048cacb5"),
    "name" : "Serbia",
    "image_path" : "http://localhost:4000/flags/serbia.png",
    "medals" : {
        "gold" : 6,
        "silver" : 0,
        "bronze" : 3
    },
    "__v" : 0
},

/* 2 */
{
    "_id" : ObjectId("6121144f75aecf0d2c55cbc7"),
    "name" : "The United States of America",
    "image_path" : "http://localhost:4000/flags/the united states of america.jpeg",
    "medals" : {
        "gold" : 4,
        "silver" : 2,
        "bronze" : 2
    },
    "__v" : 0
},

/* 3 */
{
    "_id" : ObjectId("612118af75aecf0d2c55cbca"),
    "name" : "Italy",
    "image_path" : "http://localhost:4000/flags/italy.png",
    "medals" : {
        "gold" : 2,
        "silver" : 4,
        "bronze" : 3
    },
    "__v" : 0
},

/* 4 */
{
    "_id" : ObjectId("612118e875aecf0d2c55cbcc"),
    "name" : "Canada",
    "image_path" : "http://localhost:4000/flags/canada.jpeg",
    "medals" : {
        "gold" : 0,
        "silver" : 5,
        "bronze" : 4
    },
    "__v" : 0
},

/* 5 */
{
    "_id" : ObjectId("61226534d4a955160cdb9dd6"),
    "name" : "China",
    "image_path" : "http://localhost:4000/flags/china.png",
    "medals" : {
        "gold" : 0,
        "silver" : 1,
        "bronze" : 0
    },
    "__v" : 0
},

/* 6 */
{
    "_id" : ObjectId("6122657ad4a955160cdb9dd8"),
    "name" : "Great Britain",
    "image_path" : "http://localhost:4000/flags/great britain.png",
    "medals" : {
        "gold" : 0,
        "silver" : 0,
        "bronze" : 2
    },
    "__v" : 0
},

/* 7 */
{
    "_id" : ObjectId("6122662ad4a955160cdb9dda"),
    "name" : "Australia",
    "image_path" : "http://localhost:4000/flags/australia.png",
    "medals" : {
        "gold" : 3,
        "silver" : 1,
        "bronze" : 0
    },
    "__v" : 0
},

/* 8 */
{
    "_id" : ObjectId("61226640d4a955160cdb9ddc"),
    "name" : "France",
    "image_path" : "http://localhost:4000/flags/france.png",
    "medals" : {
        "gold" : 0,
        "silver" : 1,
        "bronze" : 0
    },
    "__v" : 0
}]);
db.createCollection("competitions");

db.competitions.insertMany([{
    "_id" : ObjectId("613356991dfb6d23e4f4dcd0"),
    "locations" : [ 
        "Sapporo Odori Park"
    ],
    "delegates" : [ 
        "611ebecd4f000e18acb48fa1"
    ],
    "participants" : [ 
        {
            "id" : "612113c275aecf0d2c55cbc6",
            "name" : "Asmir Kolasinac",
            "result" : -1,
            "hasResult" : false
        }, 
        {
            "id" : "612117b575aecf0d2c55cbc9",
            "name" : "Trayvon Bromell ",
            "result" : -1,
            "hasResult" : false
        }, 
        {
            "id" : "6121191875aecf0d2c55cbce",
            "name" : "Lamont  Marcell ",
            "result" : -1,
            "hasResult" : false
        }, 
        {
            "id" : "6121198f75aecf0d2c55cbcf",
            "name" : "Andre De Grasse",
            "result" : -1,
            "hasResult" : false
        }
    ],
    "groups" : [],
    "sport" : "Athletics",
    "discipline" : "100m",
    "gender" : "male",
    "startDate" : ISODate("2021-09-03T22:00:00.000Z"),
    "endDate" : ISODate("2021-09-08T22:00:00.000Z"),
    "currentRound" : 1,
    "form" : {
        "type" : "all",
        "numRounds" : 1,
        "roundRanking" : "",
        "finalRanking" : "sortMax",
        "minPlayers" : 3,
        "maxPlayers" : 8,
        "resultType" : "time",
        "winnerPoints" : 2
    },
    "hasSchedule" : true,
    "date" : ISODate("2021-09-04T11:27:00.000Z"),
    "__v" : 0
}]);

db.createCollection("sports");

db.sports.insertMany([/* 1 */
{
    "_id" : ObjectId("611d6910a492169c49130ad2"),
    "name" : "Basketball",
    "discipline" : "",
    "type" : "team",
    "min_players" : 5,
    "max_players" : 12
},

/* 2 */
{
    "_id" : ObjectId("611d6910a492169c49130ad3"),
    "name" : "Volleyball",
    "discipline" : "",
    "type" : "team",
    "min_players" : 6,
    "max_players" : 12
},

/* 3 */
{
    "_id" : ObjectId("611d6910a492169c49130ad4"),
    "name" : "Water Polo",
    "discipline" : "",
    "type" : "team",
    "min_players" : 6,
    "max_players" : 13
},

/* 4 */
{
    "_id" : ObjectId("611d6910a492169c49130ad5"),
    "name" : "Athletics",
    "discipline" : "100m",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 5 */
{
    "_id" : ObjectId("611d6910a492169c49130ad6"),
    "name" : "Athletics",
    "discipline" : "4 x 100m Relay",
    "type" : "team",
    "min_players" : 4,
    "max_players" : 4
},

/* 6 */
{
    "_id" : ObjectId("611d6910a492169c49130ad7"),
    "name" : "Athletics",
    "discipline" : "200m",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 7 */
{
    "_id" : ObjectId("611d6910a492169c49130ad8"),
    "name" : "Athletics",
    "discipline" : "400m",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 8 */
{
    "_id" : ObjectId("611d6910a492169c49130ad9"),
    "name" : "Athletics",
    "discipline" : "4 x 400m Relay",
    "type" : "team",
    "min_players" : 4,
    "max_players" : 4
},

/* 9 */
{
    "_id" : ObjectId("611d6910a492169c49130ada"),
    "name" : "Athletics",
    "discipline" : "800m",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 10 */
{
    "_id" : ObjectId("611d6910a492169c49130adb"),
    "name" : "Athletics",
    "discipline" : "5000m",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 11 */
{
    "_id" : ObjectId("611d6910a492169c49130adc"),
    "name" : "Athletics",
    "discipline" : "10000m",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 12 */
{
    "_id" : ObjectId("611d6910a492169c49130add"),
    "name" : "Athletics",
    "discipline" : "High Jump",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 13 */
{
    "_id" : ObjectId("611d6910a492169c49130ade"),
    "name" : "Athletics",
    "discipline" : "Long Jump",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 14 */
{
    "_id" : ObjectId("611d6910a492169c49130adf"),
    "name" : "Athletics",
    "discipline" : "Triple Jump",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 15 */
{
    "_id" : ObjectId("611d6910a492169c49130ae0"),
    "name" : "Athletics",
    "discipline" : "Pole Vault",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 16 */
{
    "_id" : ObjectId("611d6910a492169c49130ae1"),
    "name" : "Athletics",
    "discipline" : "Shot Put",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 17 */
{
    "_id" : ObjectId("611d6910a492169c49130ae2"),
    "name" : "Athletics",
    "discipline" : "Discus Throw",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 18 */
{
    "_id" : ObjectId("611d6910a492169c49130ae3"),
    "name" : "Athletics",
    "discipline" : "Hammer Throw",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 19 */
{
    "_id" : ObjectId("611d6910a492169c49130ae4"),
    "name" : "Athletics",
    "discipline" : "Javelin Throw",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 20 */
{
    "_id" : ObjectId("611d6910a492169c49130ae5"),
    "name" : "Athletics",
    "discipline" : "Marathon",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 21 */
{
    "_id" : ObjectId("611d6910a492169c49130ae6"),
    "name" : "Athletics",
    "discipline" : "20km Race Walk",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 22 */
{
    "_id" : ObjectId("611d6910a492169c49130ae7"),
    "name" : "Athletics",
    "discipline" : "50km Race Walk",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 23 */
{
    "_id" : ObjectId("611d6910a492169c49130ae8"),
    "name" : "Cycling",
    "discipline" : "Cycling Road 225km",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 24 */
{
    "_id" : ObjectId("611d6910a492169c49130ae9"),
    "name" : "Swimming",
    "discipline" : "100m Butterfly",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 25 */
{
    "_id" : ObjectId("611d6910a492169c49130aea"),
    "name" : "Swimming",
    "discipline" : "200m Freestyle",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 26 */
{
    "_id" : ObjectId("611d6910a492169c49130aeb"),
    "name" : "Shooting",
    "discipline" : "50m Rifle 3 Positions",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 27 */
{
    "_id" : ObjectId("611d6910a492169c49130aec"),
    "name" : "Shooting",
    "discipline" : "10m Air Rifle",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 28 */
{
    "_id" : ObjectId("611d6910a492169c49130aed"),
    "name" : "Shooting",
    "discipline" : "10m Air Pistol",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 29 */
{
    "_id" : ObjectId("611d6910a492169c49130aee"),
    "name" : "Shooting",
    "discipline" : "25m Rapid Fire Pistol",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 30 */
{
    "_id" : ObjectId("611d6910a492169c49130aef"),
    "name" : "Tennis",
    "discipline" : "Singles",
    "type" : "individual",
    "min_players" : 1,
    "max_players" : 1
},

/* 31 */
{
    "_id" : ObjectId("611d6910a492169c49130af0"),
    "name" : "Tennis",
    "discipline" : "Doubles",
    "type" : "team",
    "min_players" : 2,
    "max_players" : 2
}]);