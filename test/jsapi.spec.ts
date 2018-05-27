import jweixin = require("../lib/jweixin-1.3.2");

import { expect } from 'chai';
import { stub, spy, SinonStub, SinonSpy } from 'sinon';
import { JsApi } from "../src/jsApi";

import { checkJsApi } from '../src/jsapi';

describe("JsApi", ()=>{
    describe("checkJsApi", ()=>{
        let fn: SinonStub;
        before(()=>{
            fn = stub(jweixin, "checkJsApi").callsFake((args)=>{
                let ret = {}
                for(let api of args.jsApiList){
                    ret[api] = true
                }
                setTimeout(()=>{
                    args.success({"checkResult": ret, "errMsg": "checkJsApi:ok"});
                });
            });
        });
        after(()=>{
            fn.restore();
        });

        it("should return a list with the same length of the input", (done)=>{
            let apiList: JsApi[] = [JsApi.addCard, JsApi.chooseCard];
            checkJsApi(apiList).subscribe(
                (res)=>{
                    expect(res.length).to.equal(2);
                    expect(res).to.have.deep.members([
                        {api: JsApi.addCard, available: true},
                        {api: JsApi.chooseCard, available: true}
                    ]);
                    done();
                }
            ) 
        });
        it("should return a list of check result which have same members of the input list", (done)=>{
            let apiList: JsApi[] = [JsApi.addCard, JsApi.chooseCard];
            checkJsApi(apiList).subscribe(
                (res)=>{
                    expect(res).to.have.deep.members([
                        {api: JsApi.addCard, available: true},
                        {api: JsApi.chooseCard, available: true}
                    ]);
                    done();
                }
            ) 
        });
    });
});