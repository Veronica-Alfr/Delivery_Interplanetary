import { IAddress } from '../interfaces/IAddress';
import db from '../database/Address.db';

export default class AddressService {
    public async registerAddress(addressData: IAddress): Promise<string> {
        return new Promise((resolve, reject) => {
            const { addressLine, city, state, country, mobilePhone, fullName, zipCode, label } = addressData;
            const query = `
                INSERT INTO addresses (addressLine, city, state, country, mobilePhone, fullName, zipCode, label) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(query, [addressLine, city, state, country, mobilePhone, fullName, zipCode, label], function (this: { lastID: number }, err: Error) {
                if (err) {
                    reject(new Error('Error registering address'));
                } else {
                    resolve(`Address ${this.lastID} registered successfully.`);
                }
            });
        });
    }

    public async updateAddress(id: number, addressData: IAddress): Promise<string> {
        const { addressLine, city, state, country, mobilePhone, fullName, zipCode, label } = addressData;
        const query = `
            UPDATE addresses
            SET addressLine = ?, city = ?, state = ?, country = ?, mobilePhone = ?, fullName = ?, zipCode = ?, label = ?
            WHERE id = ?
        `;
      
        return new Promise((resolve, reject) => {
          db.run(query, [addressLine, city, state, country, mobilePhone, fullName, zipCode, label, id], function (this: { changes: number }, err: Error) {
            if (err) {
              reject(new Error('Error updating address'));
            } else {
              resolve(`Address ${id} updated successfully. ${this.changes} row(s) affected.`);
            }
          });
        });
      }

    public async getAddressById(id: number): Promise<IAddress | null> {
        const query = `
            SELECT * FROM addresses
            WHERE id = ?
        `;
        
        return new Promise((resolve, reject) => {
            db.get(query, [id], (err: Error, row: IAddress) => {
            if (err) {
                reject(new Error('Error fetching address by ID'));
            } else {
                resolve(row);
            }
            });
        });
    }

    public async getAllAddresses(): Promise<IAddress[]> {
        const query = `
            SELECT * FROM addresses
        `;

        return new Promise((resolve, reject) => {
            db.all(query, (err: Error, rows: IAddress[]) => {
                if (err) {
                    reject(new Error('Error fetching all addresses'));
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
