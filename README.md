# Matt Is
Created this simple Alexa skill and Lambda to test custom intent slots and drive my co-working Matt nuts at the same time.

The exercise was to up the custom slot in the Intent Schema that allowed me to have a list of possible value for that slot. I set up MattAdjective which if of type LIST_OF_MATT_ADJECTIVES.
```
{
  "intents": [
    {
      "intent": "MattIntent",
      "slots": [
        {
          "name": "MattAdjective",
          "type": "LIST_OF_MATT_ADJECTIVES"
        }
      ]
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
 }
```

The values for LIST_OF_MATT_ADJECTIVES are:
```
annoying
ugly
gonna get his butt kicked
going to get his butt kicked
dumb
stinky
dorky
nerdy
hairy
ok
super
special
stupid
my buddy
a great guy
my hero
```

And the utterence is just:
```
MattIntent {MattAdjective}
```

I set the Invocation Name to "Matt he's" so when you say "Alexa tell Matt he's annoying" and Alexa would say "Hey Matt you're annoying".

None of this is rocket science but I wanted to play around with different length custom slot values and see how they performed. They worked perfectly.
