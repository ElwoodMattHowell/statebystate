import pip._vendor.requests as requests
import config
import json


def crime_data_sort(response):
    temp_dict = json.loads(response.text)['results'][0]
    rem_list = ['state_id', 'state_abbr', 'year',
                'population', 'rape_legacy', 'rape_revised']

    temp_dict['rape'] = temp_dict['rape_revised']

    crime_dict = {}
    crime_dict['year'] = temp_dict['year']
    crime_dict['population'] = temp_dict['population']

    for key in rem_list:
        del temp_dict[key]

    total_crime = [i for i in temp_dict.values()]
    total_crime = sum(total_crime)

    temp_dict['total_crime'] = total_crime

    crime_dict['crimes'] = temp_dict

    for key in crime_dict['crimes']:
        crime_dict['crimes'][key] = {'occurances': crime_dict['crimes'][key], 'per100k':
                                     round((crime_dict['crimes'][key] / crime_dict['population']) * 100000, 2)}

    return crime_dict


def crime_search(state):

    apiKey = config.fbi_api_key

    response = requests.get(
        f"{config.fbi_url}api/estimates/states/{state}/2020/2021?API_KEY={apiKey}")
    crime_dict = crime_data_sort(response)

    return crime_dict
