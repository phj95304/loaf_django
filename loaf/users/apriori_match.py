import sys
import itertools
import operator
from collections import OrderedDict
from pprint import pprint

input_data = []
tag_data = []
trxes = list()
case1 = list()
case2 = list()
item_matches=[]
item_matches2=[]
match_set_dic={}
match_tag = []

##apriori 결과 파일 읽어들이기
def load_data(): 
    global trxes
    global input_data
    ##sys.argv[]로 인수 넣어주면 자동으로 ' ' 인식함
    with open(sys.argv[1], 'r') as f: 
        input_data = f.read().split('\n')
        ##print(input_data[0])

##태그3개의 관하여 9개의 순열을 만드는 함수
def make_tags_permutations():
    global case1, case2
    pool = ['취업', '메이크업', '패션']
    ##case3 = list(map(''.join, itertools.permutations(pool))) # 3개의 원소로 수열 만들기
    case2 = list(map(''.join, itertools.permutations(pool, 2))) # 2개의 원소로 수열 만들기
    case1 = list(map(''.join, itertools.permutations(pool, 1))) # 1개의 원소로 수열 만들기

## 생성된 경우의 수 별로 apiori결과 순회, 결과 라인을 추출, multiful값이 큰 순으로 정렬 
def seek_and_sort():

    
    global input_data
    global case1, case2
    global item_matches
    global match_set_dic
    
    for i in input_data:
        data_row = i
        item_column = data_row.split('^') ## 리스트 한줄을 ^을 기준으로 문자배열 만듦
        
        ## 곱셈값에서 \t부분 제거
        multiply_value = item_column[4]
        multiply_value = multiply_value.replace("\t","")

        ## counterpart item의 불필요 부분 제거
        counterP_item = item_column[1]
        counterP_item = counterP_item.replace("\t","")
        counterP_item = counterP_item.replace("{'","")
        counterP_item = counterP_item.replace("'","")
        counterP_item = counterP_item.replace(", ","-")
        counterP_item = counterP_item.replace("}","")
        counterP_item = counterP_item.split('\n')
        counterP_item = counterP_item[0]
        # print("\n\n*************")
        # print(counterP_item)
        # print("*************")

        item_list = item_column[0] ## item 문자열을 가져옴 {'네일', '메이크업'}....
        ## item 문자열의 불필요 부분 분리
        item_pure = item_list.replace("{'","")
        item_pure = item_pure.replace("'","")
        item_pure = item_pure.replace(", ","-")
        item_pure = item_pure.replace("}","")
        item_pure = item_pure.split('\n')
        item_pure = item_pure[0]
        print(item_pure)
        ## 사용자 태그 순열조합에서 결과 item과 매치되는 부분이 있으면 저장 (중복제외)
        for i in case1: 
            if(item_pure == i):
                item_matches = item_pure
                match_set_dic[item_matches+"="+counterP_item] = multiply_value 
                
        for j in case2:
            if(item_pure == j):
                item_matches = item_pure
                match_set_dic[item_matches+"="+counterP_item] = multiply_value

    ## 곱셈값을 큰 순서대로 정렬한다. match_set_dic은 리스트 타입
    match_set_dic= sorted(match_set_dic.items(), key=operator.itemgetter(1), reverse=True) 
    print(match_set_dic)   
        
    
##전제 input_raw.txt에서 태그에 대응되는 counterpart item을 가진 user 3명을 찾는다.
def seek_user():
    global tag_data
    global match_set_dic
    global match_tag
    counterP_item_array = []
    counterP_item_array2 = []
    sen =0
    max = 0
    ## match_set_dic에서 counterpart item만 분리한다.
    
    print("\n\n")
    with open(sys.argv[2], 'r') as f: ## 태그가 저장되어있는 파일을 읽어들이기
        tag_data = f.read().split('\n')
    
    ##상위 counterpart item 3개 배열을 만든다
    for i in match_set_dic:
        counterP_item = str(i)
        counterP_item = counterP_item.split(",")
        counterP_item = counterP_item[0]
        counterP_item = str(counterP_item)
        counterP_item = counterP_item.split("=")
        counterP_item = counterP_item[1]
        counterP_item = counterP_item.replace("'","")
        ##print(type(counterP_item)) ## counterpart item 중복처리 안되어있음

        counterP_item_array.append(counterP_item)
        print(counterP_item_array)
        counterP_item_array = list(OrderedDict.fromkeys(counterP_item_array))## 중복 요소 제거
        m = len(counterP_item_array)
        if(m == 3): ## 상위 3개의 counterpart item만 배열에 넣는다 
            counterP_item_array2 = counterP_item_array
            # print("*******")
            # print(counterP_item_array2)
            break
    
    for i in tag_data: ## /값 들어가 있는ㄱ거
        sen = i
        tag_item = sen.split('/') ## tagitem => 단어 한개 
        for j in counterP_item_array2:
            if('-' in j): ## counterpart item의 요소가 두개인 경우
                    d = j.split('-') ## d[0], d[1] 으로 나뉨8
                    if(d[0] in sen and d[1] in sen):
                        match_tag.append(sen)         
            else:    
                for k in tag_item:
                    if(j == k):
                        match_tag.append(sen)                
            max = len(match_tag)
            if(max == 3):
                break             
        if(max == 3):
            for l in match_tag:
                print("***")
                print(l)
            break         

##추천된 user 추출 -> output.txt에 결과 저장
def save_result(line):    
    with open(sys.argv[3], 'a') as f:    
            f.write(line)


if __name__ == '__main__':

    ##argv = sys.argv 
    ##output = argv[2]

    load_data() 
    make_tags_permutations()
    seek_and_sort()
    seek_user()
    