list = [2,6,1,3,5,7]

def selection_sort(list):
    for i in range(len(list)):
        min = i
        
        for j in range(i +1, len(list)):
            if list[j] < list[min]:
                min = j
        
        temp = list[i]
        list[i] = list[min]
        list[min] = temp
        
        
        

selection_sort(list)
for i in list:
    print(i, end=' ')
