/* eslint-disable linebreak-style */
/* eslint-disable max-len */

/* const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4, // 5
    avgDailyIncomePopulation: 0.73 // 0.71
  },
  periodType: 'weeks', // days
  timeToElapse: 5, // 58
  reportedCases: 2747, // 674
  population: 92931687, // 66622705
  totalHospitalBeds: 678874 // 1380614
}; */

function entireObject(theObject) {
  Object.keys(theObject).forEach((key) => {
    const dec = theObject[key] % 1;
    theObject[key] -= dec;
  });

  return theObject;
}

function theFactor(time, periodType) {
  let period = time;
  switch (periodType) {
    case 'days':
      break;

    case 'weeks':
      period *= 7;
      break;

    case 'months':
      period *= 30;
      break;

    default:
  }

  const r = period % 3;

  return 2 ** ((period - r) / 3);
}

function previsionBeds(totalBed, nbreCasesSeveres) {
  const restTotalBed = totalBed * 0.35;

  return (restTotalBed - nbreCasesSeveres);
}

const covid19ImpactEstimator = (data) => { // data
  const result = {
    data,
    impact: {
      currentlyInfected: 0,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    },
    severeImpact: {
      currentlyInfected: 0,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    }
  };

  // Calcul de "reportedCases"
  result.impact.currentlyInfected = data.reportedCases * 10;
  result.severeImpact.currentlyInfected = data.reportedCases * 50;

  // Calcul de "infectionsByRequestedTime"
  result.impact.infectionsByRequestedTime = result.impact.currentlyInfected * theFactor(data.timeToElapse, data.periodType);
  result.severeImpact.infectionsByRequestedTime = result.severeImpact.currentlyInfected * theFactor(data.timeToElapse, data.periodType);

  // Calcul de "severeCasesByRequestedTime" -- est ce que les cas dépasse la population
  result.impact.severeCasesByRequestedTime = result.impact.infectionsByRequestedTime * 0.15;
  result.severeImpact.severeCasesByRequestedTime = result.severeImpact.infectionsByRequestedTime * 0.15;

  // Calcul de "hospitalBedsByRequestedTime"
  result.impact.hospitalBedsByRequestedTime = previsionBeds(data.totalHospitalBeds, result.impact.severeCasesByRequestedTime);
  result.severeImpact.hospitalBedsByRequestedTime = previsionBeds(data.totalHospitalBeds, result.severeImpact.severeCasesByRequestedTime);

  // Calcul de "casesForICUByRequestedTime"
  result.impact.casesForICUByRequestedTime = result.impact.infectionsByRequestedTime * 0.05;
  result.severeImpact.casesForICUByRequestedTime = result.severeImpact.infectionsByRequestedTime * 0.05;

  // Calcul de "casesForVentilatorsByRequestedTime"
  result.impact.casesForVentilatorsByRequestedTime = result.impact.infectionsByRequestedTime * 0.02;
  result.severeImpact.casesForVentilatorsByRequestedTime = result.severeImpact.infectionsByRequestedTime * 0.02;

  // Calcul de "dollarsInFlight"
  result.impact.dollarsInFlight = result.impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * data.timeToElapse;
  result.severeImpact.dollarsInFlight = result.severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * data.timeToElapse;

  // Obtention de la partie entière
  result.impact = entireObject(result.impact);
  result.severeImpact = entireObject(result.severeImpact);

  return result;
};

// console.log(covid19ImpactEstimator());

export default covid19ImpactEstimator;
