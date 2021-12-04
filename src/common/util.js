import Noty from "noty";
import moment from "moment";
import ReactDOM from "react-dom";

// Para mas info consultar en https://ned.im/noty/#/
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const WARNING = "WARNING";
export const ALERT = "ALERT";
export const INFO = "INFO";
export const BUTTON = "BUTTON";
export const COMPLEX = "COMPLEX";
export const COMPLEX_TIME = "COMPLEX_TIME";
export const UID_SUPPORT = "dCX7ysKgItfwy8KoeC9chsEA9373";

export default class Util {
  /* Parametros:
			msg_little: String con el mensaje de tamaño menor.
			type: String, puede ser: success, info, alert, error).
			categ: String, puede ser: Informacion, Mensaje, etc.
			msg_big: String, mensaje de tamaño mayor.
			image: imagen que se mostrata como icono.
	*/
  static notyComplex(msg_little, type, categ, msg_big) {
    new Noty({
      text: msg_little,
      type: type,
      category: categ,
      category_link: "/messages",
      date: Date.now(),
      from: msg_big,
      progressBar: true,
      callbacks: {
        onTemplate: function() {
          if (this.options.type === type) {
            this.barDom.innerHTML =
              '<div class="my-custom-template noty_body">';
            this.barDom.innerHTML +=
              "<div class='noty_custom_container'>" +
              "<div>" +
              '<div class="noty-header"><a href="' +
              this.options.category_link +
              '">' +
              this.options.from +
              '</a> <span class="noty-bull">&bull;</span> <span class="noty-date">' +
              moment(this.options.date).fromNow() +
              "</span></div>" +
              "<div>" +
              '<p class="noty-reply">' +
              this.options.text +
              "</p>" +
              "</div>" +
              "</div>" +
              "</div>";
            this.barDom.innerHTML += "<div>";
          }
        },
      },
    }).show();
  }

  static notyComplexTime(msg_little, type, categ, msg_big, image) {
    new Noty({
      text: msg_little,
      timeout: 3000,
      type: type,
      category: categ,
      category_link: "/messages",
      date: Date.now(),
      from: msg_big,
      avatar: image,
      progressBar: true,
      callbacks: {
        onTemplate: function() {
          if (this.options.type === type) {
            this.barDom.innerHTML =
              '<div class="my-custom-template noty_body">';
            this.barDom.innerHTML +=
              "<div class='noty_custom_container'>" +
              "<div>" +
              '<div class="noty-header"><a href="' +
              this.options.category_link +
              '">' +
              this.options.from +
              '</a> <span class="noty-bull">&bull;</span> <span class="noty-date">' +
              moment(this.options.date).fromNow() +
              "</span></div>" +
              "<div>" +
              '<p class="noty-reply">' +
              this.options.text +
              "</p>" +
              "</div>" +
              "</div>" +
              "<div class='noty_custom_icon'>" +
              '<img src="' +
              this.options.avatar +
              '">' +
              "</div>";
            this.barDom.innerHTML += "<div>";
          }
        },
      },
    }).show();
  }

  static notySuccess(msg) {
    new Noty({
      theme: "relax",
      type: "success",
      layout: "topRight",
      text: msg,
      timeout: 2000,
      progressBar: true,
      closeWith: ["button"],
      animation: {
        open: "noty_effects_open",
        close: "noty_effects_close",
      },
      id: false,
      force: false,
      killer: false,
      queue: "global",
      container: false,
      buttons: [],
      sounds: {
        sources: [],
        volume: 1,
        conditions: [],
      },
      titleCount: {
        conditions: [],
      },
      modal: false,
    }).show();
  }

  static notyError(msg) {
    new Noty({
      theme: "relax",
      type: "error",
      layout: "topRight",
      text: msg,
      progressBar: false,
      closeWith: ["button"],
      animation: {
        open: "noty_effects_open",
        close: "noty_effects_close",
      },
      id: false,
      force: false,
      killer: false,
      queue: "global",
      container: false,
      buttons: [],
      sounds: {
        sources: [],
        volume: 1,
        conditions: [],
      },
      titleCount: {
        conditions: [],
      },
      modal: false,
    }).show();
  }

  static notyWarning(msg) {
    new Noty({
      theme: "relax",
      type: "warning",
      layout: "bottomRight",
      text: msg,
      timeout: 2000,
      progressBar: true,
      closeWith: ["button"],
      animation: {
        open: "noty_effects_open",
        close: "noty_effects_close",
      },
      id: false,
      force: false,
      killer: false,
      queue: "global",
      container: false,
      buttons: [],
      sounds: {
        sources: [],
        volume: 1,
        conditions: [],
      },
      titleCount: {
        conditions: [],
      },
      modal: false,
    }).show();
  }

  static notyAlert(msg) {
    new Noty({
      theme: "relax",
      type: "alert",
      layout: "centerLeft",
      text: msg,
      progressBar: false,
      closeWith: ["button"],
      animation: {
        open: "noty_effects_open",
        close: "noty_effects_close",
      },
      id: false,
      force: false,
      killer: false,
      queue: "global",
      container: false,
      buttons: [],
      sounds: {
        sources: [],
        volume: 1,
        conditions: [],
      },
      titleCount: {
        conditions: [],
      },
      modal: false,
    }).show();
  }

  static notyInfo(msg) {
    new Noty({
      theme: "relax",
      type: "info",
      layout: "bottomLeft",
      text: msg,
      progressBar: false,
      closeWith: ["button"],
      animation: {
        open: "noty_effects_open",
        close: "noty_effects_close",
      },
      id: false,
      force: false,
      killer: false,
      queue: "global",
      container: false,
      buttons: [],
      sounds: {
        sources: [],
        volume: 1,
        conditions: [],
      },
      titleCount: {
        conditions: [],
      },
      modal: false,
    }).show();
  }

  static notyButton(msg) {
    var n = new Noty({
      text: msg,
      layout: "center",
      buttons: [
        Noty.button(
          "YES",
          "btn btn-success",
          function() {
            console.log("button 1 clicked");
          },
          { id: "button1", "data-status": "ok" }
        ),

        Noty.button("NO", "btn btn-error", function() {
          console.log("button 2 clicked");
          n.close();
        }),
      ],
    }).show();
  }

  static showNoty(result, message_little, is_type, category, message_big, ima) {
    if (result === ERROR) {
      this.notyError(message_little);
    } else if (result === WARNING) {
      this.notyWarning(message_little);
    } else if (result === SUCCESS) {
      this.notySuccess(message_little);
    } else if (result === ALERT) {
      this.notyAlert(message_little);
    } else if (result === INFO) {
      this.notyInfo(message_little);
    } else if (result === BUTTON) {
      this.notyButton(message_little);
    } else if (result === COMPLEX) {
      this.notyComplex(message_little, is_type, category, message_big, ima);
    } else if (result === COMPLEX_TIME) {
      this.notyComplexTime(message_little, is_type, category, message_big, ima);
    }
  }

  static sortAtoZ(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  static formatDateTimeToISODate(date, time) {
    let returnValue = moment(date);
    let _time = moment(time);
    returnValue.set({
      hour: _time.get("hour"),
      minute: _time.get("minute"),
      second: _time.get("second"),
    });
    return moment(returnValue).format("YYYY-MM-DDTHH:mm:ss");
  }

  static formatDateToShow(date) {
    return date ? moment(date).format("DD/MM/YYYY HH:mm") : null;
  }
  static formatDate(date) {
    return date ? moment(date).format("DD/MM/YYYY") : null;
  }
  static isoDateToJavascriptDate(date) {
    return date ? moment(date, "YYYY-MM-DDTHH:mm").toDate() : null;
  }
  static formatFromDDMMYYtoYYYMMDD(date) {
    return moment(date, "DD/MM/YY").format("YYYY-MM-DD");
  }

  static joinDataAndTime(date, time) {
    let _date = moment(date);
    let _time = moment(time);
    _date.set({
      hour: _time.get("hour"),
      minute: _time.get("minute"),
    });
    return _date;
  }
}

export function handleSubmitFail(errors) {
  if (!this.refs || !errors) {
    return;
  }
  const refsKeys = Object.keys(this.refs);
  const keys = Object.keys(errors);
  let key = null;
  let matchfound = false;
  refsKeys.filter((item) => {
    if (keys.indexOf(item) > -1 && !matchfound) {
      key = item;
      matchfound = true;
      return false;
    } else {
      return true;
    }
  });
  this.targetNode = this.refs[key];
  if (this.targetNode) {
    const node = ReactDOM.findDOMNode(this.targetNode);
    if (node.getElementsByTagName("input")[0]) {
      node.getElementsByTagName("input")[0].focus();
      return;
    } else if (
      node.getElementsByTagName("div")[0].getElementsByTagName("textarea")[0]
    ) {
      node
        .getElementsByTagName("div")[0]
        .getElementsByTagName("textarea")[1]
        .focus();
      return;
    }
    const parentNode = ReactDOM.findDOMNode(this);
    const xy = node.getBoundingClientRect();
    this.x = xy.right + window.scrollX;
    this.y = xy.top + window.scrollY - 60;
    (parentNode &&
      parentNode.scrollTo &&
      parentNode.scrollTo(this.x, this.y)) ||
      (parentNode && parentNode.scrollTop && (parentNode.scrollTop = this.y)) ||
      (window && window.scrollTo(this.x, this.y));
  }
}
