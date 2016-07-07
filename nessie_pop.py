#Python 2.7.6
#!/usr/bin/python

import requests
import names
from requests.auth import HTTPDigestAuth
import json
import random

api_key = '8c5bbb4e9fc2ff7fe35aa72ca63739e3'
headers = {'content-type': 'application/json'}
customer_list = []
customer_name_list = []
account_list = []
merchant_list = []
food_merchant_list = []
entertainment_merchant_list  = []
clothes_merchant_list = []

#POST /customer
url = "http://api.reimaginebanking.com/customers?key=" + api_key
print url
first_name = names.get_first_name()
last_name = names.get_last_name()
payload = " { \"first_name\": \"%s\", \"last_name\": \"%s\", \"address\": { \"street_number\": \"123\", \"street_name\": \"abc\", \"city\": \"aus\", \"state\": \"TX\", \"zip\": \"78744\" } } " %(first_name,last_name)
print payload
try :
	response = requests.post(url, data=payload, headers=headers)
	#print "success"
except : 
	print response.text


#GET /customer _id's
url = "http://api.reimaginebanking.com/customers?key=" + api_key
myResponse = requests.get(url)
if(myResponse.ok):
    jData = json.loads(myResponse.content)
    for key in jData:
        customer_list.append(key["_id"])
        customer_name_list.append(key["first_name"])
else:
    myResponse.raise_for_status()

#POST /customers/{id}/accounts
i = 0
for cust in customer_list:
	url = "http://api.reimaginebanking.com/customers/%s/accounts?key="%(cust) + api_key 
	#print url
	payload = 	"{ \"type\": \"Credit Card\", \"nickname\": %s\"s Credit Card\", \"rewards\": 1000000, \"balance\": 1000000, \"account_number\": \"1234567890987654\"}"%(customer_name_list[i])
	i = i + 1
	#print payload
	try :
		response = requests.post(url, data=payload, headers=headers)
		#print "success"
	except : 
		print "failure"

#GET /accounts _id's
url = "http://api.reimaginebanking.com/accounts?key=" + api_key
myResponse = requests.get(url)
if(myResponse.ok):
    jData = json.loads(myResponse.content)
    for key in jData:
        account_list.append(key["_id"])
else:
    myResponse.raise_for_status()


# GET /merchants
url = "http://api.reimaginebanking.com/merchants?key=" + api_key
myResponse = requests.get(url)
if(myResponse.ok):
    jData = json.loads(myResponse.content)
    for key in jData:
	    if 'category' in key:
	   	category = key["category"]
	   	if 'food' in category or 'Food' in category:
	   		food_merchant_list.append(key["_id"])
	   		#print "Food " + key["category"] + " " + key["_id"]
	   	elif 'entertainment' in category or 'Entertainment' in category:
			entertainment_merchant_list.append(key["_id"])
	   		#print "Entertainment " + key["category"] + " " + key["_id"]
	   	elif 'cloth' in category or 'Cloth' in category:
	   		clothes_merchant_list.append(key["_id"])
	   		#print "Clothes " + key["category"] + " " + key["_id"]
		merchant_list.append(key["_id"])
else:
  # If response code is not ok (200), print the resulting http error code with description
    myResponse.raise_for_status()

merch_size = len(merchant_list)
#print merch_size
clothes_merch_size = len(clothes_merchant_list)
#print clothes_merch_size
entertainment_merchant_size = len(entertainment_merchant_list)
#print entertainment_merchant_size
#print food_merchant_list
food_merchant_size = len(food_merchant_list)
#print food_merchant_size

for acc in account_list:
	rand_int = random.randint(1, 20)
	rand_chooser = random.randint(0,3)
	rand_finisher = random.randint(0, rand_int)
	rand_expense = random.randint(0, 3)
	i = 0
	current_merchant_id = 0
	while (i<rand_int):
		if(rand_chooser == 0):
			loc = random.randint(0,clothes_merch_size-1)
			current_merchant_id = clothes_merchant_list[loc]
		elif(rand_chooser == 1):
			loc = random.randint(0,entertainment_merchant_size-1)
			current_merchant_id = entertainment_merchant_list[loc]
		elif(rand_chooser == 2):
			loc = random.randint(0,food_merchant_size-1)
			current_merchant_id = food_merchant_list[loc]
		else:
			loc = random.randint(0,merch_size)
			current_merchant_id = merchant_list[loc]
		if(i==rand_finisher):
			rand_chooser = 10
		if(rand_expense == 0):
			#low spender
			amount = random.randint(1, 100)
		elif(rand_expense == 1):
			#mid expense
			amount = random.randint(100, 1000)
		elif (rand_expense == 2):
			#high spend
			amount = random.randint(1000, 5000)
		else:
			#any spend
			amount = random.randint(1, 5000)
		i = i + 1
		url = "http://api.reimaginebanking.com//account/%s/purchases?key="%(acc) + api_key
		payload = " {\"merchant_id\": \"%s\", \"medium\": \"balance\",\"purchase_date\": \"2016-07-06\",\"amount\": %d,\"status\": \"pending\",\"description\": \"string\"} "%(current_merchant_id,amount)
		print payload
		try :
			response = requests.post(url, data=payload, headers=headers)
			#print "success"
		except : 
			print "failure"
