export class FileUtils {
  public static readTextFile(event: Event, callback: Function) {
    const fileToRead = (<any>event.srcElement).files[0];

    const reader = new FileReader();
    let data = '';
    reader.onloadend = event => {
      callback(reader.result);
    };
    reader.readAsText(fileToRead);
  }

  public static downloadURI(uri, name) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
