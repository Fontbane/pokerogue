import { USE_SEASONAL_SPLASH_MESSAGES } from "#app/constants";
import { randInt } from "#utils/common";

//#region Interfaces/Types

/**
 * Represents a season with its {@linkcode name},
 * {@linkcode start} day+month, {@linkcode end} day+month
 * and {@linkcode messages}.
 */
interface SeasonDate {
  /** The locale key for the season */
  season: Seasons;
  /** The start day and month of the season. Format `MM-DD` */
  start: Date;
  /** The end day and month of the season. Format `MM-DD` */
  end: Date;
}

//#region Constants

/** The weight multiplier for the battles-won splash message */
const STATS_WEIGHT_MULTIPLIER = 15;
/** The weight multiplier for the Pokémon names splash message */
const POKEMON_NAMES_WEIGHT_MULTIPLIER = 10;
/** The weight multiplier for the seasonal splash messages */
const SEASONAL_WEIGHT_MULTIPLIER = 15;

//#region Common Messages

const commonSplashMessages = [
  "joinTheDiscord",
  "infiniteLevels",
  "everythingIsStackable",
  "optionalSaveScumming",
  "biomes",
  "openSource",
  "playWithSpeed",
  "liveBugTesting",
  "heavyInfluence",
  "pokemonRiskAndPokemonRain",
  "nowWithMoreSalt",
  "infiniteFusionAtHome",
  "brokenEggMoves",
  "magnificent",
  "doPeopleReadThis",
  "thatsCrazy",
  "gottaCatchEmAll",
  "questionableBalancing",
  "coolShaders",
  "aiFree",
  "suddenDifficultySpikes",
  "basedOnAnUnfinishedFlashGame",
  "moreAddictiveThanIntended",
  "mostlyConsistentSeeds",
  "achievementPointsDontDoAnything",
  "nothingBeatsAJellyFilledDonut",
  "alsoTryPokengine",
  "alsoTryEmeraldRogue",
  "alsoTryRadicalRed",
  "eeveeExpo",
  "checkOutYnoproject",
  "breedersInSpace",
  "alsoTryPokemonUnbound",
  "tryTheJohtoDragonChallenge",
  "basicReadingAbilityRecommended",
  "shoutoutsToTheArtists",
  "gamblingNotEncouraged",
  "dontForgetToTakeABreak",
  "wEvent",
  "ifItsNotAccurateItsAccurate",
  "everyLossIsProgressMade",
  "liveWoChienReaction",
  "itsAFeatureNotABug",
  "theEggsAreNotForEating",
  "7.8outOf10TooManyWaterBiomes",
  "butNothingHappened",
  "thePowerOfScienceIsAmazing",
  "freeToPlay",
  "theresATimeAndPlaceForEverything",
  "nowWithShinierShinies",
  "smilesGoForMiles",
  "certainlyNotDragonFree",
  "haveANiceDay",
  "redacted",
  "hi",
  "transRights",
  "shinyOddsHigherThanYouThink",
  "noFalseTrades",
  "notForProfit",
  "timeForYourDailyRun",
  "moreEggsThanADaycare",
  "disclaimerHarshSunDoesNotGiveVitaminD",
  "whoNeedsAMap",
  "luxrayIsNotADarkType",
  "selfDestructiveEncounters",
  "mostOptionsAreViable",
  "pokerogueMorse",
  "smiley",
  "beAwareOfPassives",
  "asSeenOnTheWorldWideWeb",
  "vaultinVeluzas",
  "tooManyStarters",
  "checkTheWiki",
  "winWithYourFavorites",
  "alsoTryPokerogueWait",
  "theWayISeeItKyogreIsSurrounded",
  "tryOutHoneyGather",
  "notForTheFaintOfHeart",
  "p",
  "flipYourDeviceToEvolveInkay",
  "inArceusWeTrust",
  "whyDidTheTorchicCrossTheRoad",
  "goodLuck",
  "fuseWisely",
  "compensation",
  "prepareForTroubleAndMakeItDouble",
  "anEggForYourTroubles",
  "regirock",
  "hereForAGoodTime",
  "getGoodOrDont",
  "checkTheSubreddit",
  "betterNerfGreninja",
  "inCaseOfUpdateClearYourCache",
  "insertTextHere",
  "endingEndlessNotFound",
  "iLikeMyEggsVouchered",
  "YOU",
  "noAddedSugar",
  "notSponsored",
  "notRated",
  "justOneMoreWaveMom",
  "saltCured",
  "onlyOnPokerogueNet",
  "pixelPerfection",
  "openSource",
  "probablyGood",
  "itsAMonsterHouse",
  "dontForgetYourPassword",
  "tripleTripleTripleAxel",
  "questionExclamation",
  "clownEncounters",
  "fullOfBerries",
  "limitsAreMeantToBeBrokenSometimes",
  "keepItCasual",
  "serversProbablyWorking",
  "mew",
  "makeItRainAndYourProblemsGoAway",
  "customMusicTracks",
  "youAreValid",
  "number591IsLookingOff",
  "timeForYourDeliDelivery",
  "goodFirstImpression",
  "iPreferRarerCandies",
  "pocketRoguelite",
  "porygonDidNothingWrong",
  "critMattered",
  "pickupNotRequired",
  "stayHydrated",
  "alsoTryCobblemon",
  "alsoTryPokeDoku",
  "mySleepStyleIsDoesnt",
  "makeYourOwnWorldChampDifference",
  "yoChampInTheMaking",
  "notLiableForDecisionAnxiety",
  "theAirIsTastyHere",
  "continue",
  "startANewRunToday",
  "neverGiveUp",
  "theresAlwaysNextTime",
  "oneTwoThreeAndPoof",
  "yourPokemonOnlyGoToLevelOneHundred",
  "theBattlesWillBeLegendary",
  "levelCurveBetterThanJohto",
  "alsoTryShowering",
  "wellStillBeHere",
  "weHopeToSeeYouAgain",
  "aHealthyTeamCanMeanGreaterRewards",
  "isThisThingOn",
  "needsMoreTesting",
  "whoChecksStatChanges",
  "whenTwoTrainersEyesMeet",
  "notOfficiallyOnSteam",
  "fiftyFifty",
  "metaNotIncluded",
  "bornToBeAWinner",
  "onARollout",
  "itsAlwaysNightDeepInTheAbyss",
  "folksThisIsInsane",
];

const statsMessages = ["battlesWon"];

const pokemonNameMessages = ["underratedPokemon", "aWildPokemonAppeared", "dontTalkAboutThePokemonIncident"];

//#region Seasonal Messages
const nowYear = new Date().getUTCFullYear();

enum Seasons {
  NEW_YEARS,
  VALENTINES,
  APRIL_FOOLS,
  HALLOWEEN,
  WINTER_HOLIDAY,
}

const seasonLocaleKeys: { [key in Seasons]: string } = {
  [Seasons.NEW_YEARS]: "newYears",
  [Seasons.VALENTINES]: "valentines",
  [Seasons.APRIL_FOOLS]: "aprilFools",
  [Seasons.HALLOWEEN]: "halloween",
  [Seasons.WINTER_HOLIDAY]: "winterHoliday",
};

type SeasonalMessageList = {
  [key in Seasons]: string[];
};

const seasonalSplashMessages: SeasonalMessageList = {
  [Seasons.NEW_YEARS]: ["happyNewYear", "andAHappyNewYear"],
  [Seasons.VALENTINES]: [
    "happyValentines",
    "fullOfLove",
    "applinForYou",
    "thePowerOfLoveIsThreeThirtyBST",
    "haveAHeartScale",
    "i<3You",
  ],
  [Seasons.APRIL_FOOLS]: [
    "battlesOne",
    "aprilFools",
    "removedPokemon",
    "helloKyleAmber",
    "gotcha",
    "alsoTryPokerogueTwo",
    "nowWithSameScumCountermeasures",
    "neverGonnaGiveYouGoodRolls",
    "youBumblingBuffoon",
    "doubleShinyOddsForTrainersOnly",
    "nowWithZMoves",
    "newLightType",
    "removedMegas",
    "nerfedYourFavorites",
    "grrr",
    "enabledEternatusPassiveGoodLuck",
    "theDarkestDaySoundsLikeAFutureProblem",
    "tmShopWhen",
    "whoIsFinn",
    "watchOutForShadowPokemon",
    "nowWithDarkTypeLuxray",
    "onlyOnPokerogueNetAGAIN",
    "noFreeVouchers",
    "altffourAchievementPoints",
    "rokePogue",
    "readMe",
    "winningNotIncluded",
    "timeForYourSoloUnownRun",
    "nowARealTimeStrategyGame",
    "nowWithQuickTimeEncounters",
    "timeYourInputsForHigherCatchrate",
    "certifiedButtonSimulator",
    "iHopeYouGetSuckerPunched",
  ],
  [Seasons.HALLOWEEN]: [
    "happyHalloween",
    "boo",
    "pumpkabooAbout",
    "mayContainSpiders",
    "spookyScarySkeledirge",
    "gourgeistUsedTrickOrTreat",
    "letsSnuggleForever",
  ],
  [Seasons.WINTER_HOLIDAY]: [
    "happyHolidays",
    "unaffilicatedWithDelibirdServices",
    "delibirdSeason",
    "diamondsFromTheSky",
    "holidayStylePikachuNotIncluded",
    "delibirdDirectlyToYourHouse",
    "haveAnIceDay",
    "spinTheClaydol",
    "beGoodForGoodnessSake",
    "moomooMilkAndLavaCookies",
    "iNeedAYacheBerry",
    "getJolly",
    "tisTheSeasonToBeSpeSpa",
    "deckTheHalls",
    "saveScummingGetsYouOnTheNaughtyList",
    "badTrainersGetRolycoly",
  ],
};

const seasonDates: SeasonDate[] = [
  {
    season: Seasons.NEW_YEARS,
    start: new Date(Date.UTC(nowYear, 0, 1)),
    end: new Date(Date.UTC(nowYear, 0, 15)),
  },
  {
    season: Seasons.VALENTINES,
    start: new Date(Date.UTC(nowYear, 1, 7)),
    end: new Date(Date.UTC(nowYear, 1, 21)),
  },
  {
    season: Seasons.APRIL_FOOLS,
    start: new Date(Date.UTC(nowYear, 3, 1)),
    end: new Date(Date.UTC(nowYear, 3, 3)),
  },
  {
    season: Seasons.HALLOWEEN, // Also covers day of the dead
    start: new Date(Date.UTC(nowYear, 9, 15)),
    end: new Date(Date.UTC(nowYear, 10, 3)),
  },
  {
    season: Seasons.WINTER_HOLIDAY,
    start: new Date(Date.UTC(nowYear, 12, 1)),
    end: new Date(Date.UTC(nowYear, 12, 31)),
  },
];

//#endregion

export function isPokemonSplash(msg: string): boolean {
  return pokemonNameMessages.includes(msg) || msg === "aprilFools.removedPokemon";
}

export function isGenderSplash(msg: string): boolean {
  return msg === "aprilFools.helloKyleAmber";
}

export function isStatsSplash(msg: string): boolean {
  return statsMessages.includes(msg);
}

export function getRandomSplashMessage(): string {
  const seasonalSplashes: string[] = [];
  console.log("use seasonal splash messages", USE_SEASONAL_SPLASH_MESSAGES);
  if (USE_SEASONAL_SPLASH_MESSAGES) {
    const now = new Date();
    // add seasonal splash messages if the season is active
    for (const { season, start, end } of seasonDates) {
      if (now >= start && now <= end) {
        const localeKey = seasonLocaleKeys[season];
        console.log(
          `Adding ${seasonalSplashMessages[season].length} ${Seasons[season]} splash messages (weight: x${SEASONAL_WEIGHT_MULTIPLIER})`,
        );
        seasonalSplashes.push(...seasonalSplashMessages[season].map(m => `${localeKey}.${m}`));
      }
    }
  }
  const commonThresh = commonSplashMessages.length;
  const statsThresh = commonThresh + statsMessages.length * STATS_WEIGHT_MULTIPLIER;
  const pokemonNameThresh = statsThresh + pokemonNameMessages.length * POKEMON_NAMES_WEIGHT_MULTIPLIER;
  const seasonalThresh = pokemonNameThresh + seasonalSplashes.length * SEASONAL_WEIGHT_MULTIPLIER;

  const r = randInt(seasonalThresh);
  console.log(
    `r = ${r}, common = ${commonThresh}, statsThresh = ${statsThresh}, pokeThresh = ${pokemonNameThresh}, seasonThresh = ${seasonalThresh}`,
  );
  if (r < commonThresh) {
    return commonSplashMessages[r];
  }
  if (r < statsThresh) {
    return statsMessages[Math.floor((r - commonThresh) / STATS_WEIGHT_MULTIPLIER)];
  }
  if (r < pokemonNameThresh) {
    return pokemonNameMessages[Math.floor((r - statsThresh) / POKEMON_NAMES_WEIGHT_MULTIPLIER)];
  }
  return seasonalSplashes[Math.floor((r - pokemonNameThresh) / SEASONAL_WEIGHT_MULTIPLIER)];
}
