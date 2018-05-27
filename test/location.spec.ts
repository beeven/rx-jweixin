import jweixin = require("../lib/jweixin-1.3.2");
import { getLocation, LocationType, openLocation } from "../src/location";

import { expect } from 'chai';
import { stub, spy, SinonStub, SinonSpy } from 'sinon';


describe("Location", () => {

    describe("location types", () => {
        it("should be able to translate to string correctly", () => {
            expect(LocationType.wgs84).to.equal("wgs84");
            expect(LocationType.gcj02).to.equal("gcj02");
        });
    });

    describe("getLocation", () => {
        let fn: SinonStub;
        before(() => {
            fn = stub(jweixin, "getLocation")
                .yieldsToAsync("success",
                    {
                        latitude: 11.23,
                        longitude: 23.22,
                        speed: 12,
                        accuracy: 5
                    });
        });
        afterEach(() => {
            fn.resetHistory();
        });
        after(() => {
            fn.restore();
        })

        it("should return current location", (done) => {
            getLocation(LocationType.wgs84).subscribe(
                (res) => {
                    expect(res.latitude).to.equal(11.23);
                    expect(fn.callCount).to.equal(1);
                    done();
                }
            );
        });
    });

    describe("openLocation", () => {
        let fn: SinonSpy;
        before(() => {
            fn = spy(jweixin, "openLocation");
        });
        after(() => {
            fn.restore();
        })

        it("should call wx.openLocation", () => {
            openLocation(0, 0);
            expect(fn.callCount).to.equal(1);
            expect(fn.calledWith(
                {
                    latitude: 0,
                    longitude: 0,
                    name: '',
                    address: '',
                    scale: 1,
                    infoUrl: ''
                }
            )).to.be.true;
        });
    });
});