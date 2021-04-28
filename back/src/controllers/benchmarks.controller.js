import { send } from "@/utils/errors";
import { TextModel } from "@/models/text.model";
import { UserModel } from "@/models/user.model";



// Response with all texts with their genres.
export const getTimeBenchmarks = (request, response) => {
    send(response, async () => {
      const texts = await TextModel.find().populate("genres").populate("writer");
      let phases = {
        1: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        2: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        3: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        4: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        5: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        6: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        7: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        8: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        9: {
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        },
        overall:{
            max: Number.MIN_VALUE,
            min: Number.MAX_VALUE,
            total: 0
        }
      }
      texts.forEach((text) => {
          let thisDate = new Date(text.createdAt)
          for(let i=1; i<9; i++){
            const nextDate = text.datesPerPhase[i+1] !== null ? new Date(text.datesPerPhase[i+1]) : null
            const timeInPhase = getHours(thisDate, nextDate)
            phases[i] ={
                min: phases[i].min > timeInPhase ? ((timeInPhase !== -1) ? timeInPhase :  phases[i].min) : phases[i].min,
                max: phases[i].max < timeInPhase ? ((timeInPhase !== -1) ? timeInPhase :  phases[i].max) : phases[i].max,
                total: (timeInPhase !== -1) ? timeInPhase + phases[i].total : phases[i].total
            }
            thisDate = nextDate
          }
          const startDate = new Date(text.createdAt)
          const endDate = text.datesPerPhase[9] !== null ? new Date(text.datesPerPhase[i+1]) : null
          const totalTime = getHours(startDate, endDate)
          phases['overall'] = {
              min: phases['overall'].min > totalTime ? ((totalTime !== -1) ? totalTime :  phases['overall'].min) : phases['overall'].min,
              max: phases['overall'].max < totalTime ? ((totalTime !== -1) ? totalTime :  phases['overall'].max) : phases['overall'].max,
              total: (totalTime !== -1) ? totalTime + phases['overall'].total : phases['overall'].total
          }
      })
      for(let i=1; i<9; i++){
        phases[i] ={
            ...phases[i],
            avg: phases[i].total/getLengthOfNotNull(texts,i+1)
        }
      }
      phases['overall'] = {
        ...phases['overall'],
        avg: phases['overall'].total/getLengthOfNotNull(texts,9)
    }
      
      console.log(phases)
      return phases;
    });
  };
  
  // Response with a particular text based on its id.
export const getText = (request, response) => {
    send(response, async () => {
        const { id } = request.params;
        const reader = await TextModel.find({_id:id}).populate("genres");
        return reader;
    });
};

const getHours = (date1, date2) =>{
    if(date1 !== null && date2 !== null){
        const milliseconds = Math.abs(date2 - date1);
        return milliseconds / 36e5;    
    }
    return -1
}

const getLengthOfNotNull = (texts, phase) => {
    let length = 0
    texts.forEach((text) =>{
        if(text.datesPerPhase[phase] !== null) length++
    })
    return length
}