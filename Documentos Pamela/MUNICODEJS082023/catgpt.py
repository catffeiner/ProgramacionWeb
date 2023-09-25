while True:
    user_input = input("You: ")
    words = user_input.split(" ")

    if user_input.lower() == "goodbye":
        print("CatGPT: Meow")
        break
    else:
        print("CatGPT:", end=" ")
        for words in words:
            print("Meow", end=" ")
        print()
    print("Chat ended.")