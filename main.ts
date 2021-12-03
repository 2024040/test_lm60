// let Temp = 0
// let SValue = 0
// let SumV = 0
// let mV = 0
// let loop = 0

// basic.forever(function() {
//     for (let i = 0; i < loop; i++) {
//         SValue = pins.analogReadPin(AnalogPin.P1); //アナログリード
//         SumV = SumV + SValue;
//     }

//     //mV = Math.map(SValue, 0, 1023, 0, 1700)

//     Temp = (mV - 424) / 6.25
//     // Temp = Math.idiv((mV - 424) * 1000, 625)

//     // serial.writeValue("Temp: ", Temp)
//     serial.writeNumber(Temp)

// })
// basic.showNumber(pins.analogReadPin(AnalogPin.P0))


let lm60OutAvg = 0
let vref = 0
let ctemp = 0
let REF_LOOP_CNT = 0
let ADC_LOOP_CNT = 100
let toffset = 20 //誤差調整

basic.forever(function() {
    getTemp()
})

function getTemp() {
    lm60OutAvg = 0
    vref = 0
    for (let index = 0; index < ADC_LOOP_CNT; index++) {
        lm60OutAvg += pins.analogReadPin(AnalogPin.P1)
    }
    // for (let index = 0; index < REF_LOOP_CNT; index++) {
    //     vref += pins.analogReadPin(AnalogPin.P1)
    // }
    //lm60OutAvg = Math.idiv(lm60OutAvg, ADC_LOOP_CNT)
    // vref = Math.idiv(vref, REF_LOOP_CNT)
    //lm60OutAvg = 2475 * lm60OutAvg
    // lm60OutAvg = Math.idiv(lm60OutAvg, vref)
    ctemp = (lm60OutAvg - 424) / 625
    //ctemp = Math.idiv((lm60OutAvg - 424) * 1000, 625)
    //ctemp = ctemp - toffset
    

    serial.writeNumber(ctemp)
    serial.writeLine("")
}