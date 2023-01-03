// jQuery

// Clone by Aldrin Caballero

// January 01, 2023


// Do not copy the code without permission of the owner

// It doesn't make you as a programmer

const d = document,
  w = window,
  str = "string";
  function $ (selector) {
    "use strict";
    try {
      let doc =
        selector &&
        (typeof selector != str ? selector : d.querySelectorAll(selector));

      let methods = {
        ready: function (clbck) {
          typeof clbck == "function"
            ? doc == w
              ? (doc.onload = clbck)
              : doc.addEventListener("DOMContentLoaded", clbck)
            : console.warn(
                "Warning: Missing function argument at .ready( clbck: Function ) method."
              );
        },
        
        //  use to add event to html elements
        on: function (ev, clbck) {
          if (typeof ev == str && typeof clbck == "function") {
            if (typeof selector != str) {
              doc.addEventListener(ev, clbck);
            } else {
              doc.forEach((element) => {
                element.addEventListener(ev, clbck);
              });
            }
          } else {
            console.warn("Warning: Error on .on( ev: Any, clbck: Function ) method.");
          }
        },
        
        //   same as on( ) method 
        bind: function (ev, clbck) {
          this.on(ev, clbck);
        },

        //   Encode a set of form elements as a string for submission
        serialize: function () {
          return this.toURLSearchParams(undefined);
        },

        //   Encode a set of FormData or form elements as an array of names and values
        serializeArray: function () {
          return this.toURLSearchParams("array");
        },

        //   Encode a set of FormData or form elements as an object of names and values pair
        serializeObject: function () {
          return this.toURLSearchParams("object");
        },

        //   use to set or return innerText content of html element in the first occurence
        text: function () {
          return (arguments[0] != undefined &&
            arguments.length == 1 &&
            (() =>
              typeof selector != str &&
              (() => (doc.innerText = arguments[0]))())()) ||
            (typeof selector == str &&
              arguments.length == 1 &&
              arguments != undefined &&
              (() => (doc[0].innerText = arguments[0]))()) ||
            (arguments[0] == undefined && typeof selector != str)
            ? doc.innerText
            : doc[0].innerText;
        },
        
        
        //   use to set and get html attribute
        attr: function () {
          return (arguments != undefined &&

            arguments.length == 2 &&

            (() =>
              typeof selector != str &&
              (() => (doc.setAttribute(arguments[0], arguments[1])))())()) ||
            (typeof selector == str &&
              arguments.length == 2 &&
              arguments != undefined &&
              (() => (doc[0].setAttribute(arguments[0], arguments[1])))()) ||
            (arguments != undefined && typeof selector != str && arguments.length == 1)
            ? doc.getAttribute(arguments[0])
            : doc[0].getAttribute(arguments[0]) || console.warn("Warning: Missing html attribute as an argument at .attr( attr: String, val: String | undefined ) method");
        },
        
        //   Use to remove html attribute
        removeAttr: function (attr) {
           switch (this.switchSelector()) {
              case 'object':
                 return attr && arguments.length == 1 && typeof attr == str && (() => attr.split(' ').forEach(e => doc.removeAttribute(e)))();
                 break;
              case 'nodeList':
                 return attr && arguments.length == 1 && typeof attr == str && (() => doc.forEach(e => attr.split(' ').forEach(e => doc.forEach(el => el.removeAttribute(e)))))();
                 break;
           }
           
           
        },

        //   use to set or return innerHTML content of html element in the first occurence
        html: function () {
          return (arguments[0] != undefined &&
            arguments.length == 1 &&
            (() =>
              typeof selector != str &&
              (() => (doc.innerHTML = arguments[0]))())()) ||
            (typeof selector == str &&
              arguments.length == 1 &&
              arguments != undefined &&
              (() => (doc[0].innerHTML = arguments[0]))()) ||
            (arguments[0] == undefined && typeof selector != str)
            ? doc.innerHTML
            : doc[0].innerHTML;
        },

        //   use to set or return value of html input element in the first occurence
        
        val: function () {
          return (arguments[0] != undefined &&
            arguments.length == 1 &&
            (() =>
              typeof selector != str &&
              (() => (doc.value = arguments[0]))())()) ||
            (typeof selector == str &&
              arguments.length == 1 &&
              arguments != undefined &&
              (() => (doc[0].value = arguments[0]))()) ||
            (arguments[0] == undefined && typeof selector != str)
            ? doc.value
            : doc[0].value;
        },
        
        
      };
      
      Object.defineProperty(methods, "switchSelector", {
         enumerable: !1,
         writable: !1,
         configurable: !1,
         value: function () {
            return typeof selector != str ? "object" : "nodeList"
         }
      });
      
      Object.defineProperty(methods, "toURLSearchParams", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: function (type) {
          const arr = [],
            obj = {};
          let url = new URLSearchParams();
          if (typeof selector != str)
            for (const [k, v] of new FormData(doc).entries()) url.append(k, v);
          else if (doc == "[object FormData]")
            for (const [k, v] of doc.entries()) url.append(k, v);
          else
            for (const [k, v] of new FormData(doc[0]).entries())
              url.append(k, v);

          switch (type) {
            case "array":
              for (const [n, v] of url.entries())
                arr.push({ name: n, value: v });
              break;
            case "object":
              for (const [k, v] of url.entries())
                Object.assign(obj, { [k]: v });
              break;
          }
          return type == "array"
            ? arr
            : type == "object"
            ? obj
            : url.toString();
         }
      });
      
      return methods;
      
    } catch (err) {
      console.warn(err);
    }
  };
  const jQuery = {
    // use to create a serialized representation of a plain object for use in a URL query string or Ajax request.
    param: function (obj) {
      let url = new URLSearchParams();
      if (
        typeof obj === "object" &&
        obj !== null &&
        Object.getPrototypeOf(obj) === Object.prototype
      ) {
        for (const [k, v] of Object.entries(obj)) {
          url.append(k, v);
        }
        return url.toString();
      }
      console.warn(
        "Warning: Missing or invalid object argument at .param( obj: Object ) method."
      );
    },
  };
