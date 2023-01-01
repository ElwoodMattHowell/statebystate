import pip._vendor.requests as requests
import config
import json
import data_base_query


def crime_data_sort(response):
    temp_dict = json.loads(response.text)['results'][0]
    rem_list = ['state_id', 'state_abbr', 'year',
                'population', 'rape_legacy', 'rape_revised']

    try:
        rape_stat = int(temp_dict['rape_revised'])
    except:
        rape_stat = temp_dict['rape_legacy']

    temp_dict['rape'] = rape_stat

    crime_dict = {}

    crime_dict['year'] = temp_dict['year']
    crime_dict['state'] = temp_dict['state_abbr']
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

    data_base_query.create(crime_dict)

    return crime_dict


def crime_search(state, yearStart, yearEnd):

    crime_dict = data_base_query.search(state, yearStart)
    if crime_dict == 0:
        apiKey = config.fbi_api_key

        response = requests.get(
            f"{config.fbi_url}api/estimates/states/{state}/{yearStart}/{yearEnd}?API_KEY={apiKey}")

        crime_dict = crime_data_sort(response)

    print(crime_dict)

    return crime_dict
