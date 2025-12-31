
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

declare const confetti: any;

// --- FULL DATASET (160 INTERNAL QUESTIONS) ---
const INTERNAL_MODULES = [
  {
    id: 'L5',
    title: 'Lecture 5: Mechanical Principles',
    icon: '📐',
    desc: 'Retention & Resistance Form: Essential geometry for crown success.',
    questions: [
      { question: "Retention form is defined as the feature of a preparation that resists dislodgement by forces parallel to:", options: ["The occlusal plane", "The horizontal axis", "The path of insertion", "The gingival floor"], answer: "The path of insertion" },
      { question: "The imaginary line along which a restoration is placed or removed is called:", options: ["The tipping path", "The path of insertion", "The long axis of the crown", "The arc of rotation"], answer: "The path of insertion" },
      { question: "For an anterior crown, the path of insertion should be parallel with:", options: ["The long axis of the tooth", "The incisal two-thirds of the facial surface", "The cervical third of the facial surface", "The lingual concavity"], answer: "The incisal two-thirds of the facial surface" },
      { question: "Which factor directly increases the surface area and, consequently, the retention?", options: ["Increasing the taper", "Decreasing the height of axial walls", "Increasing the length of axial walls", "Rounding the external angles"], answer: "Increasing the length of axial walls" },
      { question: "The recommended clinical convergence angle (taper) for maximum retention and seating is:", options: ["0 degrees", "6 degrees", "15 degrees", "20 degrees"], answer: "6 degrees" },
      { question: "What is the effect of an 'undercut' (reverse taper) on a preparation?", options: ["It increases retention significantly", "It makes the restoration easier to seat", "It prevents the restoration from being seated", "It reduces the need for cement"], answer: "It prevents the restoration from being seated" },
      { question: "Rounding internal line and point angles increases retention by:", options: ["Increasing the taper", "Reducing stress concentration", "Increasing the surface area", "Making the preparation smoother"], answer: "Reducing stress concentration" },
      { question: "Which alloy type provides better retention due to its high chemical reactivity with luting cements?", options: ["High gold-content alloy", "Noble metal alloy", "Base metal alloy", "Titanium alloy"], answer: "Base metal alloy" },
      { question: "Why is a 'zero-degree' parallel preparation avoided despite being theoretically ideal for retention?", options: ["It causes pulp exposure", "It creates hydrostatic pressure that prevents escape of cement", "It makes restoration too thin", "Requires specialized equipment"], answer: "It creates hydrostatic pressure that prevents escape of cement" },
      { question: "Resistance form is designed to prevent dislodgement by forces in which direction?", options: ["Parallel to the path of insertion", "Oblique or horizontal", "Purely vertical", "Along the long axis"], answer: "Oblique or horizontal" },
      { question: "The 'Tipping Path' refers to the arc of rotation of a restoration under:", options: ["Vertical forces", "Displacing occlusal forces", "Cementation pressure", "Polishing forces"], answer: "Displacing occlusal forces" },
      { question: "In parafunctional habits like Bruxism, the restoration must primarily resist:", options: ["Sticky food forces", "Axial forces", "Oblique and lateral forces", "Compressive forces only"], answer: "Oblique and lateral forces" },
      { question: "U-shaped and box-shaped grooves provide better resistance than V-shaped because:", options: ["They are easier to drill", "Their walls are perpendicular to the applied force", "They increase the taper", "They use less metal"], answer: "Their walls are perpendicular to the applied force" },
      { question: "Which of the following properties of cement increases resistance to displacement?", options: ["High solubility", "Low modulus of elasticity", "High compressive strength", "Long setting time"], answer: "High compressive strength" },
      { question: "The required occlusal clearance for a functional cusp of a full metal crown is:", options: ["0.5 mm", "1.0 mm", "1.5 mm", "2.0 mm"], answer: "1.5 mm" },
      { question: "Structural durability is influenced by all of the following EXCEPT:", options: ["Occlusal reduction", "Functional cusp bevel", "Luting cement type", "Axial reduction"], answer: "Luting cement type" },
      { question: "Occlusal reduction must follow the natural morphology of the tooth to:", options: ["Increase the taper", "Provide uniform bulk and conserve tooth structure", "Reduce the cost", "Make lab work easier"], answer: "Provide uniform bulk and conserve tooth structure" },
      { question: "The 'Permissible Taper Rule' states that the allowed taper is directly proportional to:", options: ["The width of the tooth", "The height/width ratio", "The type of cement used", "The age of the patient"], answer: "The height/width ratio" },
      { question: "If a preparation has a 'short clinical crown', why does it lose resistance even with 6 degree taper?", options: ["Surface area too large", "The arc of rotation is not blocked by enough tooth structure", "Short crowns have more sensitivity", "Requires more adhesive"], answer: "The arc of rotation is not blocked by enough tooth structure" },
      { question: "Retention of a full coverage crown is approximately _______ that of a partial coverage crown.", options: ["Half", "The same as", "Double", "Triple"], answer: "Double" },
      { question: "Roughening the fitting surface of a restoration is typically done with:", options: ["50 μm alumina particles", "100 μm diamond burs", "Hydrogen peroxide", "Distilled water"], answer: "50 μm alumina particles" },
      { question: "Which of the following is considered an 'Internal Surface' for retention?", options: ["Lingual wall of a full crown", "Buccal wall of a full crown", "Proximal box of an inlay", "Facial surface of a crown"], answer: "Proximal box of an inlay" },
      { question: "Increased taper leads to:", options: ["A limited path of withdrawal", "An unlimited path of withdrawal", "Increased resistance form", "Better marginal integrity"], answer: "An unlimited path of withdrawal" },
      { question: "Adhesive resin cements are the most retentive because they offer:", options: ["Chemical bonding only", "Micromechanical interlocking and chemical bonding", "Higher thickness", "Better color"], answer: "Micromechanical interlocking and chemical bonding" },
      { question: "The non-functional cusp reduction for a metal-ceramic crown is:", options: ["0.5 mm", "1.0 - 1.5 mm", "2.0 mm", "2.5 mm"], answer: "1.0 - 1.5 mm" },
      { question: "Which feature is used to provide space for metal on the occlusal surface?", options: ["Pinholes", "Occlusal shoulder/offset", "Taper", "Bevel"], answer: "Occlusal shoulder/offset" },
      { question: "Point angles are rounded during preparation to:", options: ["Increase the cement thickness", "Decrease stress concentration", "Speed up the preparation", "Prevent pulp exposure"], answer: "Decrease stress concentration" },
      { question: "In tilted posterior teeth, the path of insertion is determined relative to:", options: ["The long axis of that tooth", "The adjacent teeth", "The floor of the mouth", "The tongue"], answer: "The adjacent teeth" },
      { question: "Why do we place grooves in an over-tapered preparation?", options: ["Make preparation complex", "To limit the 'arc of rotation' and create a new tipping path", "To increase cement amount", "Decrease surface area"], answer: "To limit the 'arc of rotation' and create a new tipping path" },
      { question: "Stickiness of food is a factor that affects:", options: ["Geometry of preparation", "The magnitude of dislodging forces", "The luting cement choice", "Structural durability"], answer: "The magnitude of dislodging forces" },
      { question: "Mechanical interlocking is a primary feature of:", options: ["Zinc oxide eugenol", "Adhesive resin cements", "Varnish", "Composite filling"], answer: "Adhesive resin cements" },
      { question: "A preparation with long axial walls has more retention than a short one because of:", options: ["Lower taper", "Increased surface area", "Better aesthetics", "Less cement needed"], answer: "Increased surface area" },
      { question: "Functional cusp bevel is essential for:", options: ["Aesthetics", "Structural durability", "Taper", "Retention"], answer: "Structural durability" },
      { question: "External surfaces for retention are the buccal and lingual walls of:", options: ["An inlay", "A full veneer crown", "A pin", "A bridge pontic"], answer: "A full veneer crown" },
      { question: "The relationship between taper and retention is:", options: ["Directly proportional", "Inversely proportional", "Linear", "Non-existent"], answer: "Inversely proportional" },
      { question: "Path of insertion for posterior crowns is usually:", options: ["45 degrees to axis", "Parallel with the long axis", "Parallel to facial surface", "Horizontal"], answer: "Parallel with the long axis" },
      { question: "Magnitude of dislodging forces depends on:", options: ["Taper", "Texture of the restoration", "Type of gold", "Preparation length"], answer: "Texture of the restoration" },
      { question: "The 'Box Isthmus' provides:", options: ["Retention only", "Space for metal (Structural durability)", "Better color", "Faster preparation"], answer: "Space for metal (Structural durability)" },
      { question: "How does the 'Modulus of Elasticity' of a cement relate to resistance form?", options: ["Higher modulus means more flexible", "Higher modulus means stiffer, providing better support against tipping", "Affects color", "No clinical relevance"], answer: "Higher modulus means stiffer, providing better support against tipping" },
      { question: "What is the clinical consequence of ignoring the 'Functional Cusp Bevel'?", options: ["The crown will be too thin leading to fracture", "Too much retention", "Tooth sensitivity", "Cement sets too fast"], answer: "The crown will be too thin leading to fracture" }
    ]
  },
  {
    id: 'L6',
    title: 'Lecture 6: All-Ceramic Preparation',
    icon: '❄️',
    desc: 'Esthetic guidelines and precise shoulder preparation for ceramics.',
    questions: [
      { question: "Which of the following is a primary advantage of all-ceramic crowns?", options: ["High thermal conductivity", "Excellent translucency and superior esthetics", "High metal content", "Low cost"], answer: "Excellent translucency and superior esthetics" },
      { question: "The most critical design feature to minimize fracture risk in all-ceramic crowns is:", options: ["Sharp line angles", "Rounded shoulder margin", "Heavy bevels", "Minimum reduction"], answer: "Rounded shoulder margin" },
      { question: "What is a notable disadvantage of ceramic functional surfaces?", options: ["They are too soft", "They can wear down opposing natural teeth", "They change color over time", "They are highly conductive"], answer: "They can wear down opposing natural teeth" },
      { question: "All-ceramic crowns are contraindicated in:", options: ["Malformed teeth", "Young patients with large vital pulps", "Discolored teeth", "Anterior teeth fractures"], answer: "Young patients with large vital pulps" },
      { question: "A 'Half-moon' fracture in the labiogingival area is often caused by:", options: ["Excessive thickness", "Over-shortening of the preparation (Lack of support)", "Use of resin cement", "Sharp incisal edges"], answer: "Over-shortening of the preparation (Lack of support)" },
      { question: "In deep bite cases, occluding on the cervical fifth of the lingual surface produces:", options: ["Compressive stresses", "Tensile stresses", "No stress", "Shear stresses"], answer: "Tensile stresses" },
      { question: "The instrument used for incisal reduction is:", options: ["Wheel diamond", "Flat-end tapered diamond", "Needle diamond", "Round bur"], answer: "Flat-end tapered diamond" },
      { question: "Labial reduction of an anterior tooth for an all-ceramic crown is performed in:", options: ["One plane", "Two planes (Incisal and Gingival halves)", "Three planes", "Vertical lines"], answer: "Two planes (Incisal and Gingival halves)" },
      { question: "Why is the all-ceramic preparation considered 'least conservative' compared to PFM?", options: ["Requires metal coping", "Deep, uniform shoulder (1.0-1.5mm) required 360 degrees", "Incisal reduction 0.5mm", "Used on small teeth"], answer: "Deep, uniform shoulder (1.0-1.5mm) required 360 degrees" },
      { question: "The lingual reduction (axial) is performed using which instrument?", options: ["Small wheel diamond", "Flat-end tapered diamond", "Round bur", "Flame bur"], answer: "Flat-end tapered diamond" },
      { question: "Final shoulder finishing is ideally done with:", options: ["High-speed diamond burs", "End-cutting bur and hand chisels", "Polishing paste", "Wheel diamond"], answer: "End-cutting bur and hand chisels" },
      { question: "All-ceramic crowns are indicated for fractured teeth if the fracture involves:", options: ["More than 1/2 of length", "Less than 1/3 of the length", "The root only", "Whole crown"], answer: "Less than 1/3 of the length" },
      { question: "Which condition results in stress concentration in the incisal area?", options: ["Deep bite", "Edge-to-edge relationship", "Class II occlusion", "Open bite"], answer: "Edge-to-edge relationship" },
      { question: "The finishing bur number for axial finishing is:", options: ["330", "171", "557", "701"], answer: "171" },
      { question: "Which of the following is an indication for an all-ceramic crown?", options: ["Bruxism", "Discolored teeth due to RCT or trauma", "Short clinical crowns", "Thin teeth faciolingually"], answer: "Discolored teeth due to RCT or trauma" },
      { question: "The shoulder margin width for all-ceramic crowns should be:", options: ["0.5 mm", "1.0 - 1.5 mm", "2.0 - 2.5 mm", "0.1 mm"], answer: "1.0 - 1.5 mm" },
      { question: "Which instrument is used for lingual concavity reduction?", options: ["Needle diamond", "Small wheel diamond", "Flat-end tapered diamond", "Taper finishing bur"], answer: "Small wheel diamond" },
      { question: "The tissue response to all-ceramic subgingival margins is:", options: ["Highly inflammatory", "Good / Excellent", "Poor", "Unpredictable"], answer: "Good / Excellent" },
      { question: "Why must all internal line angles be rounded in all-ceramic preparation?", options: ["Cheaper lab work", "Ceramics are brittle and sharp angles act as 'stress raisers'", "Allow more cement", "Prevent sensitivity"], answer: "Ceramics are brittle and sharp angles act as 'stress raisers'" },
      { question: "All-ceramic crowns have ______ thermal conductivity.", options: ["High", "Low", "Medium", "Very high"], answer: "Low" },
      { question: "Contraindication for all-ceramic crowns includes:", options: ["Rotated teeth", "Thin teeth faciolingually", "Malformed teeth", "Peg laterals"], answer: "Thin teeth faciolingually" },
      { question: "The modified biangle chisel is used for:", options: ["Incisal reduction", "Shoulder finishing", "Lingual concavity", "Proximal reduction"], answer: "Shoulder finishing" },
      { question: "Proper preparation design ensures:", options: ["Mechanical success", "Low cost", "Fast setting cement", "Metal display"], answer: "Mechanical success" },
      { question: "The 'Half-moon' fracture due to deep bite occurs at the:", options: ["Incisal edge", "Lingual surface cervical fifth", "Facial surface", "Contact point"], answer: "Lingual surface cervical fifth" },
      { question: "Depth-orientation grooves ensure:", options: ["Higher retention", "Uniform and adequate reduction", "Better color match", "Patient comfort"], answer: "Uniform and adequate reduction" },
      { question: "Which material is indicated where high esthetic requirements exist?", options: ["Full gold crown", "All-ceramic crown", "Silver amalgam", "Stainless steel crown"], answer: "All-ceramic crown" },
      { question: "All-ceramic crowns can be used as:", options: ["Individual restorations only", "Individual restorations or bridge retainers", "Removable dentures", "Filling material"], answer: "Individual restorations or bridge retainers" },
      { question: "Younger patients with large vital pulp are contraindicated due to risk of:", options: ["Fracture", "Pulp exposure", "Color change", "Gingival recession"], answer: "Pulp exposure" },
      { question: "If the labial surface is prepared in a single plane instead of two, what is the outcome?", options: ["Increased retention", "Crown will be too thin or opaque at the incisal third", "Better translucency", "Faster prep"], answer: "Crown will be too thin or opaque at the incisal third" },
      { question: "Axial finishing is performed with:", options: ["Small wheel diamond", "Taper finishing bur no. 171", "Needle diamond", "Large round bur"], answer: "Taper finishing bur no. 171" },
      { question: "Translucency in all-ceramic crowns is considered:", options: ["Poor", "Excellent", "Average", "Non-existent"], answer: "Excellent" },
      { question: "Malformed teeth due to developmental defects are ______ for all-ceramic crowns.", options: ["Contraindications", "Indications", "Impossible", "Only treated with gold"], answer: "Indications" },
      { question: "The proximal reduction for all-ceramic crowns is:", options: ["Less conservative than PFM", "More conservative than PFM", "The same as PFM", "Not required"], answer: "Less conservative than PFM" },
      { question: "Small wheel diamond is primarily for:", options: ["Shoulder finishing", "Lingual reduction (occlusion)", "Incisal reduction", "Beveling"], answer: "Lingual reduction (occlusion)" },
      { question: "The color stability of all-ceramic crowns is:", options: ["Low", "High", "Moderate", "Poor"], answer: "High" },
      { question: "Bruxism is a condition where all-ceramic crowns are:", options: ["Recommended", "Contraindicated", "The best choice", "Used without caution"], answer: "Contraindicated" },
      { question: "The end-cutting bur is used for:", options: ["Axial reduction", "Shoulder finishing", "Incisal reduction", "Lingual concavity"], answer: "Shoulder finishing" },
      { question: "All-ceramic crowns are used when ______ can no longer restore the tooth.", options: ["Gold", "Composite resin", "Amalgam", "Temporary filling"], answer: "Composite resin" },
      { question: "Why is 'Edge-to-edge' relationship a problem for all-ceramic crowns?", options: ["Causes cement to dissolve", "Heavy loading at the thinnest incisal edge leading to fracture", "Look too white", "Increases retention"], answer: "Heavy loading at the thinnest incisal edge leading to fracture" },
      { question: "What is the clinical benefit of the 'Rounded internal angle' of the shoulder margin?", options: ["Allows rotation", "Facilitates better flow and reduces stress concentration", "Less sensitive", "Helps shade selection"], answer: "Facilitates better flow and reduces stress concentration" }
    ]
  },
  {
    id: 'L7',
    title: 'Lecture 7: Fabrication Cycle',
    icon: '🧪',
    desc: 'Ceramic chemistry, sintering stages, and PJC technology.',
    questions: [
      { question: "The first all-ceramic crown (1886) was known as:", options: ["Metal-Ceramic Crown", "Porcelain Jacket Crown (PJC)", "Zirconia Crown", "IPS e.max"], answer: "Porcelain Jacket Crown (PJC)" },
      { question: "The primary component of conventional dental porcelain is:", options: ["Alumina", "Feldspar", "Quartz", "Kaolin"], answer: "Feldspar" },
      { question: "Which component acts as a binder and provides workability?", options: ["Quartz", "Kaolin (Clay)", "Feldspar", "Pigments"], answer: "Kaolin (Clay)" },
      { question: "Quartz in porcelain serves as a:", options: ["Glass former", "Strengthening filler", "Color additive", "Flux"], answer: "Strengthening filler" },
      { question: "Annealing the platinum foil is done to:", options: ["Change color", "Relieve work hardening and allow better adaptation", "Make it melt", "Clean bacteria"], answer: "Relieve work hardening and allow better adaptation" },
      { question: "The process of powder particles fusing to form a continuous mass is:", options: ["Glazing", "Sintering", "Compaction", "Annealing"], answer: "Sintering" },
      { question: "Maximum shrinkage during firing occurs in which stage?", options: ["Low bisque", "Medium bisque", "High bisque", "Glazing"], answer: "High bisque" },
      { question: "Which stage results in a smooth and shiny surface?", options: ["Low bisque", "High bisque", "Medium bisque", "Compaction"], answer: "High bisque" },
      { question: "During sintering, why does the porcelain mass shrink significantly?", options: ["Powder particles expand", "Air spaces are eliminated as particles fuse", "Platinum shrinks", "Water is added"], answer: "Air spaces are eliminated as particles fuse" },
      { question: "Self-glazing is preferred over add-on glazing because it is:", options: ["More colorful", "More resistant to oral fluids", "Faster to apply", "Cheaper"], answer: "More resistant to oral fluids" },
      { question: "IPS e.max Press objects are visible after:", options: ["Compaction", "Rough divesting", "Sintering", "Glazing"], answer: "Rough divesting" },
      { question: "The pressure used for fine divesting of e.max objects is:", options: ["4 bar", "2 bar", "10 bar", "0 bar"], answer: "2 bar" },
      { question: "Machinable ceramics are used with:", options: ["Platinum matrix", "CAD/CAM technology", "Slip casting", "Hand layering"], answer: "CAD/CAM technology" },
      { question: "In PJC fabrication, the 'Timer's Joint' is used for:", options: ["Mixing porcelain", "Platinum matrix formation", "Polishing", "Sintering"], answer: "Platinum matrix formation" },
      { question: "Condensation by vibration helps to:", options: ["Add more water", "Pack particles and remove excess water", "Change shade", "Increase firing temperature"], answer: "Pack particles and remove excess water" },
      { question: "Devitrification is a defect where porcelain becomes:", options: ["Too transparent", "Milky due to unwanted crystallization", "Very strong", "Liquid"], answer: "Milky due to unwanted crystallization" },
      { question: "Slip-cast ceramics involve casting on a:", options: ["Metal die", "Refractory die", "Wax pattern", "Plastic die"], answer: "Refractory die" },
      { question: "Traditional porcelain is a vitreous ceramic based on:", options: ["Metal network", "Silica network and feldspar", "Resin network", "Carbon network"], answer: "Silica network and feldspar" },
      { question: "Why is 'Platinum foil' used as a matrix for Porcelain Jacket Crowns?", options: ["Give silver color", "Stable base that can withstand high firing temperatures", "Make crown cheaper", "Prevent shrinkage"], answer: "Stable base that can withstand high firing temperatures" },
      { question: "Which condensation method uses capillary attraction?", options: ["Vibration", "Brushing with dry powder addition", "Spatulation", "Whipping"], answer: "Brushing with dry powder addition" },
      { question: "High-strength ceramics like Leucite-based systems are:", options: ["Slip-cast", "Heat-pressed", "Hand-layered", "Metal-based"], answer: "Heat-pressed" },
      { question: "The ternary composition of porcelain includes Feldspar, Quartz, and:", options: ["Zirconia", "Clay", "Gold", "Silver"], answer: "Clay" },
      { question: "Rough divesting uses polishing beads at:", options: ["1 bar", "4 bar", "8 bar", "12 bar"], answer: "4 bar" },
      { question: "The breaking point of the investment ring should be at least ____ from the bottom.", options: ["5 mm", "30 mm", "100 mm", "1 mm"], answer: "30 mm" },
      { question: "Feldspar is chemically known as:", options: ["Calcium carbonate", "Anhydrous potassium alumino silicate", "Sodium chloride", "Magnesium oxide"], answer: "Anhydrous potassium alumino silicate" },
      { question: "Stages of firing include low, medium, and high:", options: ["Heat", "Bisque firing", "Glaze", "Cooling"], answer: "Bisque firing" },
      { question: "Glazing produces a surface that is:", options: ["Porous", "Impervious and smooth", "Soft", "Rough"], answer: "Impervious and smooth" },
      { question: "In PJC, compaction is done to:", options: ["Increase water", "Achieve high density and reduce shrinkage", "Make transparent", "Speed firing"], answer: "Achieve high density and reduce shrinkage" },
      { question: "How does the condensation process improve the final result of the porcelain?", options: ["Changes chemical formula", "Brings particles closer, reducing firing shrinkage", "Sets faster", "Prevents sticking"], answer: "Brings particles closer, reducing firing shrinkage" },
      { question: "Low bisque firing results in:", options: ["Particle fusion", "Loss of water", "Smooth surface", "Glazing"], answer: "Loss of water" },
      { question: "Vitreous ceramics are:", options: ["Crystalline only", "Glass-based", "Metal-based", "Organic"], answer: "Glass-based" },
      { question: "Modern high-strength ceramics were developed to overcome:", options: ["Low esthetics", "Low strength and toughness of PJC", "High cost", "Fast wear"], answer: "Low strength and toughness of PJC" },
      { question: "Refractory dies are used in:", options: ["Heat-pressing", "Slip-casting", "CAD/CAM", "Sintering on foil"], answer: "Slip-casting" },
      { question: "Kaolin is a ______ alumino silicate.", options: ["Anhydrous", "Hydrated", "Metallic", "Liquid"], answer: "Hydrated" },
      { question: "The matrix is adapted to the die using:", options: ["Sticky wax", "Wooden point and beaver-tail burnisher", "Pliers", "High heat"], answer: "Wooden point and beaver-tail burnisher" },
      { question: "Machinable ceramics example codes are:", options: ["P1, P2", "C1, A1C", "Z1, Z2", "M1, M2"], answer: "C1, A1C" },
      { question: "Glazing by adding low-fusing glass is done when:", options: ["Self-glazing not possible", "Strength needed", "Crown too big", "Color wrong"], answer: "Self-glazing not possible" },
      { question: "Feldspar, Quartz, and Clay are parts of the ______ composition.", options: ["Binary", "Ternary", "Quaternary", "Single"], answer: "Ternary" },
      { question: "What is the clinical significance of a 'Glazed' surface on a ceramic crown?", options: ["Taste", "Resists plaque accumulation and prevents opposing wear", "Easier cement", "Retention"], answer: "Resists plaque accumulation and prevents opposing wear" },
      { question: "Why must 'Shrinkage' be calculated precisely?", options: ["Save cost", "The crown will be 20-30% smaller after firing", "Faster firing", "Prevent oven breaking"], answer: "The crown will be 20-30% smaller after firing" }
    ]
  },
  {
    id: 'L8',
    title: 'Lecture 8: PFM Mastery',
    icon: '🔱',
    desc: 'Metal-ceramic structures, planar reduction, and marginal integrity.',
    questions: [
      { question: "A metal-ceramic crown is also known as:", options: ["All-porcelain crown", "Porcelain Fused to Metal (PFM)", "Gold crown", "Veneer"], answer: "Porcelain Fused to Metal (PFM)" },
      { question: "The structure of PFM consists of a ceramic layer bonded to a:", options: ["Plastic coping", "Thin cast metal coping", "Thick gold block", "Dentin layer"], answer: "Thin cast metal coping" },
      { question: "What is a major advantage of PFM over all-ceramic crowns?", options: ["Better translucency", "Higher strength due to metal substructure", "Less tooth reduction", "Easier shade matching"], answer: "Higher strength due to metal substructure" },
      { question: "The facial reduction for an anterior PFM crown should be:", options: ["0.5 mm", "1.2 mm", "2.0 mm", "0.1 mm"], answer: "1.2 mm" },
      { question: "Insufficient facial reduction in PFM leads to:", options: ["Better aesthetics", "Poor contour and shade mismatch", "Increased pulp health", "Easier lab work"], answer: "Poor contour and shade mismatch" },
      { question: "The facial reduction should be prepared in how many planes?", options: ["One plane", "Two planes", "Three planes", "Four planes"], answer: "Two planes" },
      { question: "The 'Silicone Index' is used for:", options: ["Final impression", "Verifying amount of reduction", "Cementing", "Cleaning"], answer: "Verifying amount of reduction" },
      { question: "Incisal reduction for a metal-ceramic crown is:", options: ["1.0 mm", "2.0 mm", "0.5 mm", "3.0 mm"], answer: "2.0 mm" },
      { question: "Why is the facial reduction of PFM prepared in two planes?", options: ["Speed", "Follow anatomy ensuring space for porcelain", "Increase taper", "Thicker coping"], answer: "Follow anatomy ensuring space for porcelain" },
      { question: "Lingual concavity reduction is performed with:", options: ["Needle diamond", "Small wheel diamond", "Flat-end tapered", "Round bur"], answer: "Small wheel diamond" },
      { question: "The 'Wing' in PFM preparation provides:", options: ["Aesthetics only", "Retention, resistance, and preservation", "Bite space", "Color match"], answer: "Retention, resistance, and preservation" },
      { question: "Which margin is used when gingival aesthetics are not critical?", options: ["All-ceramic margin", "Shoulder with bevel", "Knife edge", "Feather edge"], answer: "Shoulder with bevel" },
      { question: "A 'Deep Chamfer' margin has a cavosurface angle of:", options: ["45 degrees", "90 degrees", "120 degrees", "10 degrees"], answer: "90 degrees" },
      { question: "Which tool is used to 'break the contact' in proximal reduction?", options: ["Wheel diamond", "Long needle diamond", "Chisel", "Round bur"], answer: "Long needle diamond" },
      { question: "Functional cusp bevel in posterior PFM ensures:", options: ["Better fit", "Structural durability (adequate bulk)", "Higher retention", "Less metal usage"], answer: "Structural durability (adequate bulk)" },
      { question: "Smoothing sharp angles is necessary to:", options: ["Look better", "Prevent stress points that cause fracture", "Reduce reduction", "Speed cementation"], answer: "Prevent stress points that cause fracture" },
      { question: "Occlusal reduction in posterior teeth should follow:", options: ["Flat plane", "Occlusal anatomy (Planar reduction)", "Gum line", "Tongue level"], answer: "Occlusal anatomy (Planar reduction)" },
      { question: "Radial fissure burs are used for:", options: ["Incisal reduction", "Rounded shoulder margin", "Beveling", "Breaking contact"], answer: "Rounded shoulder margin" },
      { question: "What is the clinical result of a 'single-plane' facial reduction?", options: ["More retention", "Over-contoured incisal edge leading to irritation", "Pulp exposed", "No metal bond"], answer: "Over-contoured incisal edge leading to irritation" },
      { question: "Gingival bevel helps achieve:", options: ["Aesthetics", "Marginal integrity", "Taper", "Strength"], answer: "Marginal integrity" },
      { question: "The lingual axial reduction for PFM is usually:", options: ["1.2 mm", "0.7 - 1.0 mm", "2.0 mm", "0.1 mm"], answer: "0.7 - 1.0 mm" },
      { question: "The 'All-ceramic labial margin' is used to:", options: ["Increase strength", "Improve aesthetics by eliminating metal collar", "Reduce cost", "Speed lab work"], answer: "Improve aesthetics by eliminating metal collar" },
      { question: "Which instrument is used for the gingival half of the labial reduction?", options: ["Small wheel", "Round-end tapered diamond", "Needle", "Chisel"], answer: "Round-end tapered diamond" },
      { question: "Planar occlusal reduction is for:", options: ["Retention", "Structural durability", "Fit", "Integrity"], answer: "Structural durability" },
      { question: "Depth Orientation Grooves are used in:", options: ["Anterior", "Posterior", "Both", "Neither"], answer: "Both" },
      { question: "The metal-ceramic crown is versatile because it can be used for:", options: ["Temporary only", "Single crowns and FPDs", "Fillings only", "Orthodontics"], answer: "Single crowns and FPDs" },
      { question: "A 'Radial Shoulder' is a:", options: ["Beveled margin", "Modified shoulder with small radius and 90° cavosurface", "Sharp 45°", "Knife edge"], answer: "Modified shoulder with small radius and 90° cavosurface" },
      { question: "In posterior teeth, the facial reduction is divided into:", options: ["One plane", "Occlusal and Gingival halves", "Vertical sections", "Mesial/distal halves"], answer: "Occlusal and Gingival halves" },
      { question: "Why do we prefer a 'Chamfer' or 'Shoulder with Bevel' for the metal margins of a PFM?", options: ["Look longer", "Allow thin metal for better seal and integrity", "Use more porcelain", "Easier to clean"], answer: "Allow thin metal for better seal and integrity" },
      { question: "Modified binangle chisel is used for:", options: ["Breaking contact", "Margin finishing", "Occlusal reduction", "Drilling holes"], answer: "Margin finishing" },
      { question: "Proximal wings are present where:", options: ["Tooth is small", "Deep reduction transitions to shallow", "All-metal", "No porcelain"], answer: "Deep reduction transitions to shallow" },
      { question: "The silicone index is made:", options: ["After prep", "Before preparation", "During cementation", "Lab only"], answer: "Before preparation" },
      { question: "Adequate reduction is critical for:", options: ["Comfort only", "Aesthetics and gingival health", "Lowering cost", "Fast prep"], answer: "Aesthetics and gingival health" },
      { question: "Chamfer provides:", options: ["Structural durability and marginal integrity", "Aesthetics only", "Translucency", "Pulp protection"], answer: "Structural durability and marginal integrity" },
      { question: "The lab knife with No. 25 blade is used for:", options: ["Cutting tooth", "Trimming the silicone putty", "Finishing margin", "Polishing metal"], answer: "Trimming the silicone putty" },
      { question: "Facial axial reduction contributes to:", options: ["Retention and resistance", "Structural durability", "Aesthetics", "All of the above"], answer: "All of the above" },
      { question: "For posterior crowns, occlusal reduction is followed by:", options: ["Polishing", "Functional cusp bevel", "Cementation", "Impression"], answer: "Functional cusp bevel" },
      { question: "Shoulder margin is for:", options: ["Retention", "Marginal integrity", "Translucency", "Taper"], answer: "Marginal integrity" },
      { question: "What happens if incisal reduction is 1.0 mm instead of 2.0 mm?", options: ["Stronger", "Thin porcelain leading to fracture or opacity", "Fit", "Speed"], answer: "Thin porcelain leading to fracture or opacity" },
      { question: "Why is 'Planar' occlusal reduction better than 'Flat'?", options: ["Less time", "Maintains space while preserving tooth structure", "Heavier", "Increases metal surface"], answer: "Maintains space while preserving tooth structure" }
    ]
  }
];

const EXTERNAL_LINKS = [
  { id: 'ex1', title: 'Basics & Biology', icon: '💎', desc: 'Core biology and basic prep principles.', url: 'https://zead1254.github.io/Fixed-Prosthodontics-Quiz1/' },
  { id: 'ex2', title: 'Full Metal Crowns', icon: '⚔️', desc: 'Metallic systems and material selection.', url: 'https://zead1254.github.io/Full-Metal-Crown-Quiz-2/' },
  { id: 'ex3', title: 'Instrumentation', icon: '⚙️', desc: 'Detailed guide to dental burs and tools.', url: 'https://zead1254.github.io/dental-instruments-quiz3/' },
  { id: 'ex4', title: 'Bio-Mechanics', icon: '⚡', desc: 'Analysis of resistance and retention geometry.', url: 'https://zead1254.github.io/Bio-Mechanical-Principles-of-Tooth-Preparation-Quiz4/' }
];

// --- APP CORE ---

const App = () => {
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [introDone, setIntroDone] = useState(false);

  if (!introDone) return <IntroScreen onComplete={() => setIntroDone(true)} />;

  return (
    <div className="min-h-screen px-4 sm:px-12 py-8 reveal">
      {/* HUD Navbar */}
      <nav className="glass-v3 sticky top-0 left-0 right-0 z-50 flex justify-between items-center px-6 sm:px-12 py-4 rounded-full mb-16 max-w-7xl mx-auto border border-white/5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">Fixed<span className="text-indigo-500 italic">Hub</span></h1>
          <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-1">Boss Academy Pro</p>
        </div>
        <div className="hidden sm:flex items-center gap-8">
          <a href="https://zead1254.github.io/Dr_zead" target="_blank" className="text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-400 transition-colors">Designer Portfoilo</a>
          <button className="px-5 py-2 btn-boss rounded-full text-white font-black text-[9px] uppercase tracking-widest">Portal Active</button>
        </div>
      </nav>

      <main className="container mx-auto max-w-7xl">
        {/* Cinematic Header */}
        <section className="text-center mb-24">
          <h2 className="text-fluid-h1 text-white mb-6">Excellence In Preparation.</h2>
          <div className="glass-v3 inline-block px-10 py-6 rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
             <p className="text-xl sm:text-2xl italic text-indigo-100 font-bold arabic-luxury" style={{ direction: 'rtl' }}>
               "التميز ليس غاية، بل هو رحلة إتقان لا تنتهي."
             </p>
          </div>
        </section>

        {/* SECTION 1: REFERENCE MODULES (EXTERNAL) */}
        <section className="mb-24">
           <div className="flex items-center gap-4 mb-10">
              <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] whitespace-nowrap">Reference Materials</h3>
              <div className="h-px bg-white/10 flex-grow"></div>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {EXTERNAL_LINKS.map(link => (
               <a key={link.id} href={link.url} target="_blank" className="glass-v3 p-8 rounded-[2.5rem] group flex flex-col h-full">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">{link.icon}</div>
                  <h4 className="text-lg font-black mb-2">{link.title}</h4>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed flex-grow mb-6">{link.desc}</p>
                  <div className="flex items-center justify-between text-[8px] font-black text-indigo-500 uppercase tracking-widest mt-auto">
                    <span>External Module</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </div>
               </a>
             ))}
           </div>
        </section>

        {/* SECTION 2: INTERNAL TRAINING (THE FULL DATASET) */}
        <section>
          <div className="flex items-center gap-4 mb-10">
             <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] whitespace-nowrap">Clinical Mastery Training</h3>
             <div className="h-px bg-white/10 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {INTERNAL_MODULES.map(module => (
              <div key={module.id} className="glass-v3 p-10 rounded-[3rem] cursor-pointer group flex flex-col sm:flex-row items-center gap-8 border-l-4 border-l-transparent hover:border-l-indigo-500" onClick={() => setActiveQuiz(module)}>
                <div className="text-7xl group-hover:rotate-6 transition-transform flex-shrink-0">{module.icon}</div>
                <div className="flex-grow text-center sm:text-left">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-4 inline-block">Module {module.id}</span>
                  <h4 className="text-2xl font-black mb-2 tracking-tight">{module.title}</h4>
                  <p className="text-sm text-gray-400 font-medium mb-6 leading-relaxed">{module.desc}</p>
                  <button className="w-full sm:w-auto px-10 py-3 btn-boss rounded-full text-white font-black text-[10px] uppercase tracking-widest shadow-xl">Initiate Training</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-40 text-center pb-10">
        <div className="h-px bg-white/5 w-full mb-10"></div>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Proprietary Educational Environment &copy; 2025 Dr. Zead</p>
      </footer>

      <Reminder />
      {activeQuiz && <QuizStage module={activeQuiz} onExit={() => setActiveQuiz(null)} />}
    </div>
  );
};

// --- QUIZ STAGE COMPONENT (PROFESSIONAL INTERFACE) ---

const QuizStage = ({ module, onExit }: { module: any, onExit: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState('');

  const q = module.questions[idx];

  useEffect(() => {
    if (done || pick) return;
    if (timeLeft <= 0) { setPick('TIMEOUT'); return; }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, pick, done]);

  const handlePick = (opt: string) => {
    if (pick) return;
    setPick(opt);
    if (opt === q.answer) {
      setScore(s => s + 1);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else {
      setFeedback('shake-error');
      setTimeout(() => setFeedback(''), 500);
    }
  };

  const next = () => {
    if (idx < module.questions.length - 1) {
      setIdx(idx + 1); setPick(null); setTimeLeft(60);
    } else setDone(true);
  };

  if (done) return (
    <div className="fixed inset-0 z-[1000] bg-[#020617]/98 flex items-center justify-center p-6 sm:p-12 reveal">
       <div className="glass-v3 p-12 sm:p-20 rounded-[4rem] max-w-lg w-full text-center border-indigo-500 shadow-[0_0_100px_rgba(99,102,241,0.2)]">
          <h2 className="text-xl font-black text-gray-500 uppercase tracking-widest mb-6">Efficiency Assessment</h2>
          <div className="text-8xl sm:text-9xl font-black text-indigo-500 leading-none mb-10 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            {Math.round((score/module.questions.length)*100)}%
          </div>
          <p className="text-2xl font-black text-white mb-12 uppercase">Result: {score} / {module.questions.length}</p>
          <button onClick={onExit} className="w-full py-6 btn-boss rounded-full font-black text-sm shadow-xl uppercase tracking-widest">Terminate Session</button>
       </div>
    </div>
  );

  return (
    <div className={`fixed inset-0 z-[800] bg-[#020617] flex flex-col overflow-hidden ${feedback}`}>
      {/* Header Bar */}
      <header className="glass-v3 px-6 sm:px-12 py-5 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-6">
          <span className="text-4xl">{module.icon}</span>
          <div className="hidden sm:block">
            <h4 className="text-indigo-400 font-black uppercase text-[10px] tracking-widest">{module.title}</h4>
            <p className="text-[8px] text-gray-600 font-bold uppercase mt-1">Evaluation Process • Question {idx + 1}/{module.questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 sm:gap-10">
          <div className={`relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-2 ${timeLeft < 10 ? 'border-red-500 animate-pulse' : 'border-indigo-500/20'}`}>
            <span className={`font-black text-sm sm:text-lg ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>{timeLeft}</span>
          </div>
          <button onClick={onExit} className="text-gray-500 hover:text-white transition-all scale-125"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-12 overflow-y-auto custom-scrollbar flex flex-col items-center">
        <div className="w-full max-w-4xl pt-8 sm:pt-12 pb-32">
          {/* Progress Indicator */}
          <div className="w-full h-1 bg-white/5 rounded-full mb-16 overflow-hidden">
             <div className="h-full bg-indigo-500 transition-all duration-700 ease-out" style={{ width: `${((idx + 1)/module.questions.length)*100}%` }}></div>
          </div>

          <div className="mb-12 sm:mb-20">
            <span className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.4em] block mb-4">Question Core</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">{q.question}</h2>
          </div>
          
          <div className="grid gap-4 sm:gap-5">
             {q.options.map((opt: string, i: number) => {
               const isCorrect = opt === q.answer;
               const isSelected = pick === opt;
               let style = "w-full p-6 sm:p-8 text-left rounded-[1.5rem] sm:rounded-[2rem] border-2 transition-all flex items-center gap-6 sm:gap-8 relative overflow-hidden ";
               
               if (!pick) style += "border-white/5 bg-white/5 hover:border-indigo-500/50 hover:bg-white/10 hover:translate-x-2";
               else if (isCorrect) style += "border-green-500 bg-green-500/10 text-green-400 scale-[1.01] shadow-[0_0_40px_rgba(34,197,94,0.1)]";
               else if (isSelected) style += "border-red-500 bg-red-500/10 text-red-400";
               else style += "border-white/5 opacity-20 grayscale scale-[0.98]";

               return (
                 <button key={i} onClick={() => handlePick(opt)} disabled={!!pick} className={style}>
                   <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass-v3 flex items-center justify-center font-black text-sm sm:text-lg border border-white/10 shrink-0">{String.fromCharCode(65+i)}</span>
                   <span className="text-sm sm:text-lg font-bold leading-snug">{opt}</span>
                 </button>
               );
             })}
          </div>

          {pick && (
            <div className="mt-20 reveal">
              <button onClick={next} className="w-full py-6 btn-boss rounded-full font-black text-sm sm:text-lg shadow-2xl tracking-[0.2em] uppercase">
                {idx < module.questions.length - 1 ? 'Proceed' : 'Finalize Module'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- ACCESSORIES ---

const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [typed, setTyped] = useState("");
  const [ready, setReady] = useState(false);
  const text = "جميع هذه الأسئلة تم إنشاؤها بواسطة الذكاء الاصطناعي.. ما تنسوش تدعوا للـ Boss";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(text.slice(0, i + 1)); i++;
      if (i >= text.length) { clearInterval(interval); setReady(true); }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[2000] bg-[#020617] flex items-center justify-center p-6">
       <div className="glass-v3 p-12 sm:p-20 rounded-[4rem] max-w-xl w-full text-center border-t-4 border-indigo-600 shadow-3xl">
          <div className="text-7xl sm:text-9xl mb-12 opacity-30">🤖</div>
          <p className="text-2xl sm:text-4xl font-black text-white arabic-luxury leading-relaxed mb-12" style={{ direction: 'rtl' }}>{typed}</p>
          {ready && <button onClick={onComplete} className="w-full py-6 btn-boss rounded-full font-black text-xs sm:text-sm animate-in zoom-in duration-500 tracking-widest uppercase shadow-2xl">Access Academy</button>}
       </div>
    </div>
  );
};

const Reminder = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setShow(true); setTimeout(() => setShow(false), 9000); }, 3000);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed top-24 right-0 z-[1500] p-4 sm:p-6 animate-in slide-in-from-right duration-1000">
      <div className="glass-v3 px-10 py-8 rounded-l-[3.5rem] border-r-0 border-indigo-500 shadow-2xl flex items-center gap-8">
        <div className="text-4xl sm:text-6xl">🤔</div>
        <p className="text-2xl sm:text-4xl font-black text-white arabic-luxury" style={{ direction: 'rtl' }}>مش دعيت ليه ؟؟</p>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
