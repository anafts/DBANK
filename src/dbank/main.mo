 import Debug "mo:base/Debug";
 import Time "mo:base/Time";
 import Float "mo:base/Float";


// creating a class - DBank
  actor DBank {
      stable var currentValue: Float = 300;
      stable var startTime = Time.now();
      // startTime := Time.now();

      
// create a private function 
      public func topUp(amout: Float ) {
      currentValue += amout;
      Debug.print(debug_show(currentValue));
    };

    public func withdrawal(amount:Float ) {
        if (currentValue >= amount) {
            currentValue -= amount;
            Debug.print(debug_show(currentValue));
        } else {
            Debug.print("Not enough money");
        }
    };

    public shared query func checkBalance() : async Float {
         return currentValue;
    };

    public func compound() {
     let currentTime = Time.now();
     
     let timeElapsedNS = currentTime - startTime;
     let timeElapsedS = timeElapsedNS / 1000000000;
 
     currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));

     startTime := currentTime
 
    };

  };
