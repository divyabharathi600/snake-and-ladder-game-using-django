from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
import random

# Define the snakes and ladders
snakes = {16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78}
ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100}

def index(request):
    if 'position' not in request.session:
        request.session['position'] = 0
    return render(request, 'game/index.html', {'position': request.session['position']})

def move(request):
    if request.method == 'POST':
        dice_roll = random.randint(1, 6)
        position = request.session['position'] + dice_roll

        if position in snakes:
            position = snakes[position]
        elif position in ladders:
            position = ladders[position]

        if position > 100:
            position = 100

        request.session['position'] = position

        if position == 100:
            return render(request, 'game/win.html')

    return redirect('index')
