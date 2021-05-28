import { send } from "@/utils/errors";
import { TextModel } from "@/models/text.model";
import { UserModel } from "@/models/user.model";

const initialPhases = {
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


// Response with all texts with their genres.
export const getTimeBenchmarks = (request, response) => {
    send(response, async () => {
      const texts = await TextModel.find().populate("genres").populate("writer");
      const phases = {...initialPhases};
      texts.forEach((text) => {
          let thisDate = new Date(text.createdAt)
          for(let i=1; i<9; i++){
            const nextDate = text.datesPerPhase[i+1] !== null ? new Date(text.datesPerPhase[i+1]) : null
            console.log(nextDate)
            const timeInPhase = getHours(thisDate, nextDate)
            phases[i] ={
                min: phases[i].min > timeInPhase ? ((timeInPhase !== -1) ? timeInPhase :  phases[i].min) : phases[i].min,
                max: phases[i].max < timeInPhase ? ((timeInPhase !== -1) ? timeInPhase :  phases[i].max) : phases[i].max,
                total: (timeInPhase !== -1) ? timeInPhase + phases[i].total : phases[i].total
            }
            thisDate = nextDate
          }
          const startDate = new Date(text.createdAt)
          const endDate = text.datesPerPhase[9] !== null ? new Date(text.datesPerPhase[9]) : null
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


export const getTimeBenchmarksByWriter = (request, response) => {
    send(response, async () => {
        const texts = await TextModel.find().populate("genres").populate("writer");
        const phasesByWriters = {};
        console.log(initialPhases)
        texts.forEach((text) => {
            let thisDate = new Date(text.createdAt)
            const writer = text.writer.pseudonym
            if(!phasesByWriters[writer]) phasesByWriters[writer] = {...initialPhases};
            for(let i=1; i<9; i++){
                const nextDate = text.datesPerPhase[i+1] !== null ? new Date(text.datesPerPhase[i+1]) : null
                const timeInPhase = getHours(thisDate, nextDate)
                phasesByWriters[writer][i] ={
                    min: (phasesByWriters[writer][i].min > timeInPhase && timeInPhase !== -1) ? timeInPhase : phasesByWriters[writer][i].min,
                    max: (phasesByWriters[writer][i].max < timeInPhase && timeInPhase !== -1) ? timeInPhase :  phasesByWriters[writer][i].max,
                    total: (timeInPhase !== -1) ? timeInPhase + phasesByWriters[writer][i].total : phasesByWriters[writer][i].total
                }
                thisDate = nextDate
            }
            const startDate = new Date(text.createdAt)
            const endDate = text.datesPerPhase[9] !== null ? new Date(text.datesPerPhase[9]) : null
            const totalTime = getHours(startDate, endDate)
            phasesByWriters[writer]['overall'] = {
                min: (phasesByWriters[writer]['overall'].min > totalTime  && totalTime !== -1) ? totalTime : phasesByWriters[writer]['overall'].min,
                max: (phasesByWriters[writer]['overall'].max < totalTime  && totalTime !== -1) ? totalTime :  phasesByWriters[writer]['overall'].max,
                total: (totalTime !== -1) ? totalTime + phasesByWriters[writer]['overall'].total : phasesByWriters[writer]['overall'].total
            }
            console.log(phasesByWriters)
        })
        Object.keys(phasesByWriters).forEach((key, index) => {
            const writerPhase = phasesByWriters[key]
            const textsWriter = texts.map((text) => text.writer.pseudonym == key ? text : undefined)
            for(let i=1; i<9; i++){
                writerPhase[i] ={
                    ...writerPhase[i],
                    avg: writerPhase[i].total/getLengthOfNotNull(textsWriter,i+1)
                }
            }
            writerPhase['overall'] = {
                ...writerPhase['overall'],
                avg: writerPhase['overall'].total/getLengthOfNotNull(textsWriter,9)
            }
        })
        return phasesByWriters;
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
        if(text && text.datesPerPhase[phase] !== null) length++
    })
    return length
}