import { ElectionConfig } from '../../types/configuration';

export const mockElectionConfig: ElectionConfig = {
  electionMachineQuestions: [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 9
    },
    {
      id: 10
    },

    {
      id: 11
    },
    {
      id: 12
    },
    {
      id: 13
    },
    {
      id: 14
    },
    {
      id: 15
    },
    {
      id: 16,
      valueDetails: [
        {
          valueId: 1,
          targetBound: 'Vasemmisto'
        }
      ]
    },
    {
      id: 17,
      valueDetails: [
        {
          valueId: 1,
          targetBound: 'Oikeisto'
        }
      ]
    },
    {
      id: 18,
      valueDetails: [
        {
          valueId: 1,
          targetBound: 'Vasemmisto'
        }
      ]
    },
    {
      id: 19,
      valueDetails: [
        {
          valueId: 1,
          targetBound: 'Oikeisto'
        }
      ]
    },
    {
      id: 20,
      valueDetails: [
        {
          valueId: 1,
          targetBound: 'Oikeisto'
        }
      ]
    },
    {
      id: 21,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Liberaalivihreä'
        },
        {
          valueId: 4,
          targetBound: 'Kansainvälinen'
        }
      ]
    },
    {
      id: 22,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Kansalliskonservatiivi'
        },
        {
          valueId: 2,
          targetBound: 'Arvokonservatiivi'
        }
      ]
    },
    {
      id: 23,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Liberaalivihreä'
        },
        {
          valueId: 2,
          targetBound: 'Arvoliberaali'
        }
      ]
    },
    {
      id: 24,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Kansalliskonservatiivi'
        }
      ]
    },
    {
      id: 25,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Liberaalivihreä'
        },
        {
          valueId: 3,
          targetBound: 'Enemmän vihreä'
        }
      ]
    },
    {
      id: 26,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Kansalliskonservatiivi'
        },
        {
          valueId: 4,
          targetBound: 'Kansallismielinen'
        }
      ]
    },
    {
      id: 27,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Liberaalivihreä'
        },
        {
          valueId: 3,
          targetBound: 'Enemmän vihreä'
        }
      ]
    },
    {
      id: 28,
      valueDetails: [
        {
          valueId: 5,
          targetBound: 'Kansalliskonservatiivi'
        }
      ]
    },
    {
      id: 29,
      valueDetails: [
        {
          valueId: 6,
          targetBound: 'Maaseutu'
        }
      ]
    },
    {
      id: 30,
      valueDetails: [
        {
          valueId: 6,
          targetBound: 'Kaupunki'
        }
      ]
    }
  ],
  values: [
    {
      id: 1,
      name: 'Vasemmisto-Oikeisto',
      bounds: ['Vasemmisto', 'Oikeisto']
    },
    {
      id: 2,
      name: 'Arvokonservatiivi - Arvoliberaali',
      bounds: ['Arvokonservatiivi', 'Arvoliberaali']
    },
    {
      id: 3,
      name: 'Vähemmän vihreä - Enemmän vihreä',
      bounds: ['Vähemmän vihreä', 'Enemmän vihreä']
    },
    {
      id: 4,
      name: 'Kansallismielinen - Kansainvälinen',
      bounds: ['Kansallismielinen', 'Kansainvälinen']
    },
    {
      id: 5,
      name: 'Liberaalivihreä-Kansalliskonservatiivi',
      bounds: ['Kansalliskonservatiivi', 'Liberaalivihreä']
    },
    {
      id: 6,
      name: 'Maaseutu - Kaupunki',
      bounds: ['Maaseutu', 'Kaupunki']
    }
  ]
};
