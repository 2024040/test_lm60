# basic.forever(function() {
# let Temp = 0
# let SValue = 0
# let SumV = 0
# let mV = 0
# for (let i = 0; i < 10; i++) {
# SValue = pins.analogReadPin(AnalogPin.P0); //アナログリード
# SumV = SumV + SValue;
# basic.pause(100);
# }
# SValue = SumV * 0.1;
# mV = Math.map(SValue, 0, 1023, 0, 3300)
# // Temp = (mV - 424) / 6.25
# Temp = Math.idiv((mV - 424) * 1000, 625)
# serial.writeValue("Temp: ", Temp)
# basic.pause(3000);
# })
# basic.showNumber(pins.analogReadPin(AnalogPin.P0))
lm60OutAvg = 0
vref = 0
ctemp = 0
REF_LOOP_CNT = 0
ADC_LOOP_CNT = 0
toffset = 0
# 誤差調整
def getTemp():
    global lm60OutAvg, vref, ctemp
    lm60OutAvg = 0
    vref = 0
    for index in range(ADC_LOOP_CNT):
        lm60OutAvg += pins.analog_read_pin(AnalogPin.P1)
    # for (let index = 0; index < REF_LOOP_CNT; index++) {
    # vref += pins.analogReadPin(AnalogPin.P1)
    # }
    lm60OutAvg = Math.idiv(lm60OutAvg, ADC_LOOP_CNT)
    vref = Math.idiv(vref, REF_LOOP_CNT)
    lm60OutAvg = 2475 * lm60OutAvg
    lm60OutAvg = Math.idiv(lm60OutAvg, vref)
    ctemp = Math.idiv((lm60OutAvg - 424) * 1000, 625)
    # ctemp = ctemp + toffset
    serial.write_number(ctemp)
    serial.write_line("")