import jweixin = require("../lib/jweixin-1.3.2");
import { config } from "../src/config";

import { expect } from 'chai';
import { stub, spy, SinonStub, SinonSpy } from 'sinon';
import { JsApi } from "../src/jsApi";


describe("Config",()=>{
    describe("config", () => {
        let ready: SinonStub;
        let configfn: SinonSpy;
        before(() => {
            ready = stub(jweixin, "ready").callsArgAsync(0);
            configfn = spy(jweixin, "config");
        });
        afterEach(() => {
            ready.resetHistory()
            configfn.resetHistory();
        });
        after(() => {
            ready.restore();
            configfn.restore();
        });
    
        it("should call config method on wx and wait for ready function called", (done) => {
            config("appId", "nonceStr", 1234, "abcd", [JsApi.chooseImage, JsApi.getLocation]).subscribe(
                () => {
                    expect(configfn.calledOnce).to.be.true;
                    expect(configfn.firstCall.lastArg).to.have.property("appId").that.equals("appId");
                    expect(configfn.firstCall.lastArg).to.have.property("jsApiList").that.has.members(["chooseImage","getLocation"]);
                    expect(ready.callCount).to.be.equal(1);
                    done();
                }
            )
        });
    });
});
