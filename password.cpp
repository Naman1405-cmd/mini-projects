#include <iostream>
using namespace std;
int main() {
  const string realPass = "INC" ;
  string pass ;
  int attempts = 0 ;
  
  do {
    cout << "Enter your password (attempt " << attempts+1 << " of 3\n" ;
    cin >> pass ;
    attempts ++ ;
    if (pass != realPass) {
      cout << "Incorrect Password\n" ;
    }
  } while (pass != realPass && attempts < 3) ;
    if (pass == realPass) {
      cout << "Access Granted\n" ;
    } else {cout << "Access denied. Too many failed attempts"}
  return 0;
}
