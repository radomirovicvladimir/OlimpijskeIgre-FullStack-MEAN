import express from 'express';
import Country from '../models/country';

export class CountryController {
    getAllCountries= (req: express.Request, res: express.Response)=> {
        Country.find({}, (err, docs)=> {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        })
    }
};