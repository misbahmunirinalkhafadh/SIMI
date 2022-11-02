import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import LogoMII from '../../../assets/img/mii.png';

export const BASTDeployment = ({ id, data, site }) => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = ["No", "Type", "Brand", "Model", "Serial Number", "Completeness"];
    // define an empty array of rows
    const tableRows = [];
    const assets = [data]

    // for each ticket pass all its data into an array
    assets.forEach((val, index) => {
        const assetData = [
            index + 1,
            val.category,
            val.brand,
            val.model,
            val.serialNumber,
            `${val.information?.operatingSystem ? val.information?.operatingSystem : ''}, ${val.information?.processor ? val.information?.processor : ''}, ${val.information?.ram ? `RAM ${val.information?.ram}` : ''}, ${val.information.storageType ? val.information.storageType : ''} ${val.information.storageCapacity ? val.information.storageCapacity : ''}`
        ];
        // push each tickcet's info into a row
        tableRows.push(assetData);
    });

    // startY is basically margin-top
    doc.addImage(LogoMII, 'PNG', 15, 15, 30, 23)

    doc.setFont('helvetica', 'normal', 'bold').setFontSize(21)
    doc.text("FORM BAST DEPLOYMENT", 58, 25)
    doc.text("ADD", 95, 35)

    doc.setFont('helvetica', 'normal').setFontSize(14);
    doc.text("Yang bertanda tangan di bawah ini :", 15, 55);
    doc.text(`Nama     \t\t: ${data?.deployed?.user}`, 15, 62);
    doc.text(`ID Karyawan  \t: ${data?.deployed?.nik ? data?.deployed?.nik : ''}`, 15, 69);
    doc.text(`No Telp  \t\t: ${data?.deployed?.phone ? data?.deployed?.phone : ''}`, 15, 76);
    doc.text(`Site \t\t\t: ${site}`, 15, 83);

    doc.text("Dengan ini mengajukan permohonan peminjaman Hardware untuk keperluan \nOperasional di Site/Project dengan perincian unit :", 15, 95);
    autoTable(doc, { head: [tableColumn], body: tableRows, margin: { top: 105 } })

    doc.setFont('helvetica', 'normal').setFontSize(14);
    doc.text(`Lama Peminjaman\t: Selama Project Berlangsung`, 15, 135);
    doc.text(`Tanggal Kembali   \t: `, 15, 142);

    doc.setFont('helvetica', 'normal', 'bold').setFontSize(14)
    doc.text("Kewajiban: ", 15, 157);
    doc.setFont('helvetica', 'normal').setFontSize(14);
    doc.text("- Kehilangan atau kerusakan karena kelalaian penggunaan, saya sanggup \nmengganti dengan minimal jenis hardware yang sama atau lebih baik dalam \nwaktu yang singkat (max. 2 minggu)", 25, 164);
    doc.text("- Apabila dalam tenggang waktu yang diberikan belum dapat memberikan \nunit penganti maka akan dipotong dari salary-nya sebesar harga unit penganti \nyang dibeli oleh team MS Delivery", 25, 183);

    doc.setFont('helvetica', 'normal', 'bold').setFontSize(14)
    doc.text("Catatan: ", 15, 210);
    doc.setFont('helvetica', 'normal').setFontSize(14);

    doc.setFont('helvetica', 'normal', 'bold').setFontSize(14)
    doc.text("Tanda terima: ", 15, 220);
    doc.text("Pemohon", 60, 236);
    doc.text("Pemberi", 130, 236);

    doc.setFont('helvetica', 'normal').setFontSize(14);
    doc.text(`(${data?.deployed?.user})`, 40, 270);
    doc.text("", 120, 270);

    doc.rect(35, 230, 70, 50) // Kotak gede Kiri
    doc.rect(105, 230, 70, 50) // Kotak gede Kanan
    doc.rect(35, 239, 70, 32) // Kotak kecil Kiri
    doc.rect(105, 239, 70, 32) // Kotak kecil Kanan

    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3];
    // we define the name of our PDF file.
    doc.save(`BAST_Deployment_${dateStr}.pdf`);
}
