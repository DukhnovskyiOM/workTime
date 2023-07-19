const startWorkTime = '09:00';
const endWorkTime = '21:00';
const busyArr = [
        {'start' : '10:30',
        'stop' : '10:50'
        },
        {'start' : '18:40',
        'stop' : '18:50'
        },
        {'start' : '14:40',
        'stop' : '15:50'
        },
        {'start' : '16:40',
        'stop' : '17:20'
        },
        {'start' : '20:05',
        'stop' : '20:20'
        }
        ];
const workTime = 30

const freeTime = (start, end, busy, work) => {

  let strH = start.slice(0,2);
  let strM = start.slice(3,4);
  const lengthArrMinute = (end.slice(0,2) - start.slice(0,2)) * 60 + 1;
  const lengthArrHour = end.slice(0,2) - start.slice(0,2) + 1;

  let arrHours = []
    for (let i = 0; i < lengthArrHour; i++) {
      arrHours.push(strH.toString());
           strH++
        }

  let arrMinutes = []
  let t = 0

    for (let i = 0; i < lengthArrMinute; i++) {
            if(strM < 10){
              arrMinutes.push(`${arrHours[t]}:0${strM}`)
            } else {
              arrMinutes.push(`${arrHours[t]}:${strM}`)
            }
            if(strM === 59){
              t++
              strM = -1
            }
        strM++
        }

    for(let i = 0; i < busy.length; i++){
      let len = ((busy[i].stop.slice(0,2) - busy[i].start.slice(0,2)) * 60) + (busy[i].stop.slice(3) - busy[i].start.slice(3))
      let id = arrMinutes.indexOf(busy[i].start);

      arrMinutes.splice(id, len, null)
    }

  const arrWorkTime = [];
  let part = []

    for(let i = 0; i < arrMinutes.length; i++){
      part.push(arrMinutes[i])
        if(part.length === work || arrMinutes[i] === null){
          arrWorkTime.push(part)
          part = []
        }
    }
  
    let result = arrWorkTime.filter(e => e.length === work)

        return result.map(e => [
          ...e.slice(0, 1),
          ...e.slice(29, 30)
        ])

    
}

console.log(freeTime(startWorkTime, endWorkTime, busyArr, workTime));