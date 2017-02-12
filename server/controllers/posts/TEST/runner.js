var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../../../config');


describe('Routing', function() {
    var url = 'http://localhost:3000/api';

    before(function(done) {
        mongoose.connect(config.testDB);
        done();
    });

    // to perform async test!
    describe('Posts', function() {
        it('should create a post successfully', function(done) {
            var post = {
                title: 'dummy',
                body: 'test test',
                authot: 'Valerio'
            };

            request(url)
                .post('/post/create')
                .send(post)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });
        // it('should correctly update an existing account', function(done){
        //     var body = {
        //         firstName: 'JP',
        //         lastName: 'Berd'
        //     };
        //     request(url)
        //         .put('/api/profiles/vgheri')
        //         .send(body)
        //         .expect('Content-Type', /json/)
        //         .expect(200) //Status code
        //         .end(function(err,res) {
        //             if (err) {
        //                 throw err;
        //             }
        //             // Should.js fluent syntax applied
        //             res.body.should.have.property('_id');
        //             res.body.firstName.should.equal('JP');
        //             res.body.lastName.should.equal('Berd');
        //             res.body.creationDate.should.not.equal(null);
        //             done();
        //         });
        // });

    });
});